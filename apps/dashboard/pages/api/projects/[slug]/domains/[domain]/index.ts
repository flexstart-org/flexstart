import { NextApiRequest, NextApiResponse } from "next";
import { withProjectAuth } from "@/lib/auth";
import { addDomain, removeDomain } from "@/lib/domains";
import prisma from "@/lib/prisma";
import * as k8s from "@kubernetes/client-node";
import { validDomainRegex } from "@/lib/utils";
// import { changeDomainForImages, changeDomainForLinks } from "@/lib/api/links";
import { ProjectProps } from "@/lib/types";
import cloudinary from "cloudinary";

export default withProjectAuth(
  async (req: NextApiRequest, res: NextApiResponse, project: ProjectProps) => {
    const ns = project.namespace;

    const kc = new k8s.KubeConfig();
    kc.loadFromFile("assets/config.json");

    const k8sApiIng = kc.makeApiClient(k8s.NetworkingV1Api);

    const options = {
      headers: {
        "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_MERGE_PATCH,
      },
    };

    // PUT /api/projects/[slug]/domains/[domain] edit a project's domain
    if (req.method === "PUT") {
      const { slug, domain } = req.query as { slug: string; domain: string };
      if (
        !slug ||
        typeof slug !== "string" ||
        !domain ||
        typeof domain !== "string" ||
        domain !== project.domain
      ) {
        return res
          .status(400)
          .json({ error: "Missing or misconfigured project slug or domain" });
      }

      const newDomain = req.body;

      const validDomain =
        validDomainRegex.test(newDomain) &&
        !newDomain.endsWith(".flexstart.org");

      if (!validDomain) {
        return res.status(422).json({
          domainError: "Invalid domain",
        });
      }

      if (domain !== newDomain) {
        if (project && project.name !== slug) {
          return res.status(400).json({ error: "Domain already exists" });
        }
        const body = {
          spec: {
            rules: [
              {
                host: newDomain,
                http: {
                  paths: [
                    {
                      backend: {
                        service: {
                          name: `${slug}`,
                          port: {
                            number: Number(project.port),
                          },
                        },
                      },
                      path: "/",
                      pathType: "Prefix",
                    },
                  ],
                },
              },
            ],
            tls: [{ hosts: [newDomain], secretName: `${newDomain}-tls` }],
          },
        };

        const [prismaResponse, ingPatchRespose] = await Promise.allSettled([
          prisma.project.update({
            where: {
              domain,
            },
            data: {
              domain: newDomain,
              domainVerified: false,
            },
          }),
          k8sApiIng.patchNamespacedIngress(
            slug,
            ns,
            body,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            options
          ),
          // changeDomainForLinks(project.id, domain, newDomain),
          // changeDomainForImages(project.id, domain, newDomain),
        ]);

        return res.status(200).json({
          prismaResponse,
          ingPatchRespose,
        });
      }
      return res.status(200).json({ message: "Domains are the same" });
    } else {
      res.setHeader("Allow", ["PUT"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
    }
  }
);
