import prisma from "lib/prisma";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const handle = searchParams.get("handle");
  const take = searchParams.get("take");
  const skip = searchParams.get("skip");
  const sortKey = searchParams.get("sortKey");
  const reverse = searchParams.get("reverse");
  const query = searchParams.get("query");

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
      const products =
        query === "undefined"
          ? await prisma.product.findMany({
              take: take ? Number(take) : undefined,
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
