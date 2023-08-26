import { NextApiRequest, NextApiResponse } from "next";
import * as k8s from "@kubernetes/client-node";
import prisma from "@/lib/prisma";
import { Session, withUserAuth } from "@/lib/auth";

export default withUserAuth(
  async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const { name, auth } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        namespace: true,
      },
    });
    const ns = `${user?.namespace}`;

    if (req.method === "GET") {
      const name: unknown = req.query.name;
      
      if (name) {
        const exists = await prisma.secret.findFirst({
          where: { name, namespace: ns },
        });
        if (exists) {
          return res.status(200).json(1);
        } else {
          return res.status(200).json(0);
        }
      } else {
        const secret = await prisma.secret.findMany({
          where: { namespace: ns },
        });
        return res.status(200).json(secret);
      }
    }

    if (req.method === "POST") {
      const kc = new k8s.KubeConfig();
      kc.loadFromFile("assets/config.json");
      const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

      const body = {
        data: { ".dockerconfigjson": auth },
        metadata: { name: `${name}` },
        type: "kubernetes.io/dockerconfigjson",
      };

      k8sApi.createNamespacedSecret(ns, body);
      await prisma.secret.create({
        data: { name: name, namespace: ns, userId: session.user.id! },
      });

      return res.status(200).json("created");
    }

    if (req.method === "DELETE") {
      const { name } = req.body;

      const kc = new k8s.KubeConfig();
      kc.loadFromFile("assets/config.json");
      const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

      k8sApi.deleteNamespacedSecret(name, ns);
      await prisma.secret.deleteMany({
        where: {
          namespace: ns,
          name: name,
        },
      });

      return res.status(200).json("deleted");
    }
  }
);
