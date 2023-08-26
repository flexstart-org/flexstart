import { NextApiRequest, NextApiResponse } from "next";
import * as k8s from "@kubernetes/client-node";
import prisma from "@/lib/prisma";
import { Session, withUserAuth } from "@/lib/auth";
import { nanoid } from "@/lib/utils";
import config from "@/assets/config.json";

export default withUserAuth(
  async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const { name, image, port, arch, replicas, secret } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        namespace: true,
      },
    });
    const ns = `${user?.namespace}`;

    const config = require("@/assets/config.json");

    const kc = new k8s.KubeConfig();
    kc.loadFromFile("assets/config.json");

    const k8sApi = kc.makeApiClient(k8s.AppsV1Api);
    const k8sApiSvc = kc.makeApiClient(k8s.CoreV1Api);
    const k8sApiIng = kc.makeApiClient(k8s.NetworkingV1Api);

    if (req.method === "GET") {
      if (name) {
        const response = await prisma.project.findFirst({
          where: {
            namespace: ns,
            name: name,
          },
        });

        const data = JSON.stringify(response, null, 2);

        return res.status(200).send(data);
      } else {
        const response = await prisma.project.findMany({
          where: {
            users: {
              some: {
                userId: `${session.user.id}`,
              },
            },
          },
        });

        const data = JSON.stringify(response, null, 2);

        return res.status(200).send(data);
      }
    }

    if (req.method === "POST") {
      let domain = `${name}.flexstart.org`;
      const domainExists = await prisma.project.findFirst({
        where: { domain },
        select: { domain: true },
      });

      if (domainExists) {
        domain = `${name + nanoid()}.flexstart.org`;
      }

      const deployment = {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
          labels: { app: `${name}` },
          name: `${name}`,
        },
        spec: {
          selector: {
            matchLabels: {
              app: `${name}`,
            },
          },
          replicas: Number(replicas) || 1,
          template: {
            metadata: {
              labels: {
                app: `${name}`,
              },
            },
            spec: {
              affinity: {
                nodeAffinity: {
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: "kubernetes.io/arch",
                            operator: "In",
                            values: [arch || "amd64"],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              containers: [
                {
                  image: `${image}`,
                  name: `${name}`,
                  ports: [
                    {
                      containerPort: Number(port),
                    },
                  ],
                  resources: {
                    limits: {
                      cpu: "250m",
                      memory: "500Mi",
                    },
                  },
                },
              ],
              imagePullSecrets: [{ name: secret || "none" }],
            },
          },
        },
      };

      const service = {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: `${name}`,
        },
        spec: {
          ports: [
            {
              port: Number(port),
            },
          ],
          selector: {
            app: `${name}`,
          },
        },
      };

      const ingress = {
        apiVersion: "networking.k8s.io/v1",
        kind: "Ingress",
        metadata: {
          annotations: {
            "cert-manager.io/cluster-issuer": "letsencrypt-prod",
          },
          name: `${name}`,
        },
        spec: {
          ingressClassName: "nginx",
          rules: [
            {
              host: `${domain}`,
              http: {
                paths: [
                  {
                    backend: {
                      service: {
                        name: `${name}`,
                        port: {
                          number: Number(port),
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
          tls: [
            {
              hosts: [`${domain}`],
              secretName: `${name}-flexstart-org-tls`,
            },
          ],
        },
      };

      const [prismaResponse, deployResponse, svcResponse, ingResponse] =
        await Promise.all([
          prisma.project.create({
            data: {
              namespace: `${ns}`,
              name,
              replicas: Number(replicas) || 1,
              image,
              port: Number(port),
              arch: arch || "amd64",
              secret,
              domain,
              usage: Number(replicas) || 1,
              users: {
                create: {
                  userId: `${session?.user.id}`,
                  role: "owner",
                },
              },
            },
          }),
          prisma.user.update({
            where: {
              id: `${session.user.id}`,
            },
            data: {
              usage: {
                increment: Number(replicas) || 1,
              },
            },
          }),
          k8sApi.createNamespacedDeployment(ns, deployment),
          k8sApiSvc.createNamespacedService(ns, service),
          k8sApiIng.createNamespacedIngress(ns, ingress),
        ]);
      return res.status(200).json({
        project: prismaResponse,
        deploy: deployResponse,
        svc: svcResponse,
        ing: ingResponse,
      });
    }
  },
  {
    needProSubscription: true,
  }
);
