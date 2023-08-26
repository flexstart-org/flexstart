import { NextApiRequest, NextApiResponse } from "next";
import { Session, withUserAuth } from "@/lib/auth";
import { DEFAULT_REDIRECTS, RESERVED_KEYS } from "@/lib/constants";
import prisma from "@/lib/prisma";

export default withUserAuth(
  async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const { slug } = req.query as { slug: string };

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id!,
      },
      select: {
        namespace: true,
      },
    });

    // GET /api/projects/[slug]/exists – check if a project exists
    if (req.method === "GET") {
      if (RESERVED_KEYS.has(slug) || DEFAULT_REDIRECTS[slug]) {
        return res.status(200).json(1);
      }
      const project = await prisma.project.findFirst({
        where: {
          namespace: user?.namespace!,
          name: slug,
        },
        select: {
          name: true,
        },
      });
      if (project) {
        return res.status(200).json(1);
      } else {
        return res.status(200).json(0);
      }
    } else {
      res.setHeader("Allow", ["GET"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
    }
  },
);
