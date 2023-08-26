import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import * as k8s from "@kubernetes/client-node";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Session } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = (await getServerSession(req, res, authOptions)) as Session;

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    const data = JSON.stringify(user, null, 2);

    return res.status(200).send(data);
  }

  if (req.method === "PUT") {
    const { username } = req.body;

    const response = await prisma.user.update({
      where: { id: session.user.id },
      data: { username },
    });

    return res.status(200).json("Username updated");
  }

  if (req.method === "DELETE") {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    const kc = new k8s.KubeConfig();
    kc.loadFromFile("assets/config.json");
    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

    await prisma.project.deleteMany({
      where: { namespace: user?.namespace! },
    });
    await prisma.user.delete({
      where: { id: session.user.id },
    });
    k8sApi.deleteNamespace(user?.namespace!);

    return res.status(200).json("Account deleted");
  }
}
