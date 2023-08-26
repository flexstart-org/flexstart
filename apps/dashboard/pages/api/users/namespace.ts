import { NextApiRequest, NextApiResponse } from "next";
import * as k8s from "@kubernetes/client-node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ns } = req.body;

  const kc = new k8s.KubeConfig();
  kc.loadFromFile("assets/config.json");
  const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

  if (req.method === "POST") {
    const namespace = {
      metadata: {
        name: `${ns}`,
      },
    };

    const response = k8sApi.createNamespace(namespace);

    return res.status(200).json("created");
  }
}
