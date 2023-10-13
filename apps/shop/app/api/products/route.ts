import { NextRequest } from "next/server";
import prisma from "lib/prisma";

export async function GET(req: NextRequest) {
  const handle = req.nextUrl.searchParams.get("handle");
  const take = req.nextUrl.searchParams.get("take");
  const skip = req.nextUrl.searchParams.get("skip");
  const sortKey = req.nextUrl.searchParams.get("sortKey");
  const reverse = req.nextUrl.searchParams.get("reverse");
  const query = req.nextUrl.searchParams.get("query");

  // console.log(take, sortKey, reverse, query);

  if (handle) {
    const products = await prisma.product.findUnique({
      where: {
        handle,
      },
    });

    return Response.json(products);
  } else if (query || sortKey) {
    if (sortKey === "PRICE" && reverse === "false") {
      const products =
        query === "undefined"
          ? await prisma.product.findMany({
              orderBy: {
                priceRange: { minVariantPrice: { amount: "asc" } },
              },
            })
          : await prisma.product.findMany({
              where: {
                OR: [
                  {
                    title: {
                      contains: query!,
                      mode: "insensitive",
                    },
                  },
                  {
                    description: {
                      contains: query!,
                      mode: "insensitive",
                    },
                  },
                ],
              },
              orderBy: {
                priceRange: { minVariantPrice: { amount: "asc" } },
              },
            });

      return Response.json(products);
    } else if (sortKey === "PRICE" && reverse === "true") {
      const products =
        query === "undefined"
          ? await prisma.product.findMany({
              orderBy: {
                priceRange: { minVariantPrice: { amount: "desc" } },
              },
            })
          : await prisma.product.findMany({
              where: {
                OR: [
                  {
                    title: {
                      contains: query!,
                      mode: "insensitive",
                    },
                  },
                  {
                    description: {
                      contains: query!,
                      mode: "insensitive",
                    },
                  },
                  {
                    tags: {
                      hasSome: [query!],
                    },
                  },
                ],
              },
              orderBy: {
                priceRange: { minVariantPrice: { amount: "desc" } },
              },
            });

      return Response.json(products);
    } else if (sortKey === "CREATED_AT" && reverse === "true") {
      const products =
        query === "undefined"
          ? await prisma.product.findMany({
              orderBy: {
                updatedAt: "desc",
              },
            })
          : await prisma.product.findMany({
              where: {
                OR: [
                  {
                    title: {
                      contains: query!,
                      mode: "insensitive",
                    },
                  },
                  {
                    description: {
                      contains: query!,
                      mode: "insensitive",
                    },
                  },
                ],
              },
              orderBy: {
                updatedAt: "desc",
              },
            });

      return Response.json(products);
    } else {
      const products = await prisma.product.findMany({
        take: take ? Number(take) : undefined,
      });

      return Response.json(products);
    }
  } else {
    const products = await prisma.product.findMany({
      take: take ? Number(take) : undefined,
    });

    return Response.json(products);
  }
}
