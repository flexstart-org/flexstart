import { NextApiRequest, NextApiResponse } from "next";
import * as k8s from "@kubernetes/client-node";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import type { Session } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ns } = req.body;

  const session = (await getServerSession(req, res, authOptions)) as Session;

  const kc = new k8s.KubeConfig();
  kc.loadFromFile("assets/config.json");

  const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    const data = JSON.stringify(user, null, 2);

    return res.status(200).send(data);
  }

  if (req.method === "POST") {
    const namespace = {
      metadata: {
        name: `${ns}`,
      },
    };

    const response = k8sApi.createNamespace(namespace);

    res.status(200).json("created");
  }
}