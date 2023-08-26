import { NextApiRequest, NextApiResponse } from "next";
import * as k8s from "@kubernetes/client-node";
import { Session, withProjectAuth } from "@/lib/auth";
import { removeDomain } from "@/lib/domains";
import prisma from "@/lib/prisma";
import { ProjectProps } from "@/lib/types";
import { getDateTimeLocal } from "@/lib/utils";
// import { deleteProjectLinks } from "@/lib/api/links";
// import cloudinary from "cloudinary";

export default withProjectAuth(
  async (
    req: NextApiRequest,
    res: NextApiResponse,
    project: ProjectProps,
    session: Session
  ) => {
    const { slug } = req.query;
    const ns = project.namespace;

    const kc = new k8s.KubeConfig();
    kc.loadFromFile("assets/config.json");

    const k8sApi = kc.makeApiClient(k8s.AppsV1Api);
    const k8sApiSvc = kc.makeApiClient(k8s.CoreV1Api);
    const k8sApiIng = kc.makeApiClient(k8s.NetworkingV1Api);

    const options = {
      headers: {
        "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_MERGE_PATCH,
      },
    };

    if (!slug || typeof slug !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or misconfigured project slug" });
    }

    // GET /api/projects/[slug] – get a specific project
    if (req.method === "GET") {
      return res.status(200).json(project);

      // PUT /api/projects/[slug] – edit a specific project
    } else if (req.method === "PUT") {
      const { image, port, replicas } = req.body;

      const body = {
        spec: {
          replicas: Number(replicas) || project?.replicas,
          template: {
            spec: {
              containers: [
                {
                  image: image || project?.image,
                  name: `${slug}`,
                  ports: [
                    {
                      containerPort: Number(port) || project?.port,
                    },
                  ],
                },
              ],
            },
          },
        },
      };

      const [prismaResponse, patchResponse] = await Promise.all([
        prisma.project.update({
          where: {
            id: project.id,
          },
          data: {
            image: image || project?.image,
            replicas: Number(replicas) || project?.replicas,
            port: Number(port) || project?.port,
          },
        }),
        k8sApi.patchNamespacedDeployment(
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
      ]);

      return res.status(200).json({
        prismaResponse,
        patchResponse,
      });

      // PATCH /api/projects/[slug] – rollout restart a project
    } else if (req.method === "PATCH") {
      const body = {
        spec: {
          template: {
            metadata: {
              annotations: {
                "kubectl.kubernetes.io/restartedAt": getDateTimeLocal(),
              },
            },
          },
        },
      };

      k8sApi.patchNamespacedDeployment(
        slug,
        ns,
        body,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        options
      );

      return res.status(200).json("rollout successfull");

      // DELETE /api/projects/[slug] – delete a project
    } else if (req.method === "DELETE") {
      const { domain, replicas } = req.body;

      if (!domain || typeof domain !== "string" || domain !== project.domain) {
        return res
          .status(400)
          .json({ error: "Missing or misconfigured domain" });
      }

      const [
        prismaResponse,
        updateResponse,
        deployResponse,
        svcResponse,
        ingResponse,
      ] = await Promise.all([
        prisma.project.delete({
          where: {
            domain,
          },
        }),
        prisma.user.update({
          where: {
            id: `${session.user.id}`,
          },
          data: {
            usage: {
              decrement: Number(replicas),
            },
          },
        }),
        k8sApi.deleteNamespacedDeployment(slug, ns),
        k8sApiSvc.deleteNamespacedService(slug, ns),
        k8sApiIng.deleteNamespacedIngress(slug, ns),
      ]);

      return res.status(200).json({
        prismaResponse,
        updateResponse,
        deployResponse,
        svcResponse,
        ingResponse,
      });
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
    }
  }
);
