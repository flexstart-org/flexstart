import { randomUUID } from "crypto";
import prisma from "lib/prisma";

export async function GET(req: Request) {
  const cartId = new URL(req.url).searchParams.get("cartId");

  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId!,
    },
  });

  return Response.json(cart);
}

export async function POST(req: Request) {
  const { cartId, lines } = await req.json();

  if (cartId && lines.length > 0) {
    const product = await prisma.product.findFirst({
      where: {
        variants: {
          some: {
            id: lines[0].merchandiseId,
          },
        },
      },
    });

    const variant = product?.variants.find(
      (variant) => variant.id === lines[0].merchandiseId
    );

    const cartItems = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
    });

    const amount =
      Number(cartItems?.cost.totalAmount.amount) +
      Number(variant?.price.amount);

    const cart = await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        cost: {
          update: {
            totalAmount: {
              amount: String(amount),
              currencyCode: variant?.price.currencyCode!,
            },
          },
        },
        lines: {
          push: {
            id: randomUUID(),
            quantity: lines[0].quantity,
            cost: {
              totalAmount: {
                amount: variant?.price.amount!,
                currencyCode: variant?.price.currencyCode!,
              },
            },
            merchandise: {
              id: variant?.id!,
              title: variant?.title!,
              selectedOptions: variant?.selectedOptions,
              product: product!,
            },
          },
        },
        totalQuantity: { increment: lines[0].quantity },
      },
    });

    return Response.json(cart);
  } else {
    const cart = await prisma.cart.create({
      data: {
        checkoutUrl: "",
        cost: {
          subtotalAmount: {
            amount: "0",
            currencyCode: "USD",
          },
          totalAmount: {
            amount: "0",
            currencyCode: "USD",
          },
          totalTaxAmount: {
            amount: "0",
            currencyCode: "USD",
          },
        },
        lines: [],
      },
    });

    return Response.json(cart);
  }
}

export async function PATCH(req: Request) {
  const { cartId, type, lines } = await req.json();

  const product = await prisma.product.findFirst({
    where: {
      variants: {
        some: {
          id: lines[0].merchandiseId,
        },
      },
    },
  });

  const variant = product?.variants.find(
    (variant) => variant.id === lines[0].merchandiseId
  );

  const cartItems = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
  });

  const amount =
    type === "plus"
      ? Number(cartItems?.cost.totalAmount.amount) +
        Number(variant?.price.amount)
      : Number(cartItems?.cost.totalAmount.amount) -
        Number(variant?.price.amount);

  const cart = await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      totalQuantity: { increment: type === "plus" ? 1 : -1 },
      cost: {
        update: {
          totalAmount: {
            update: {
              amount: String(amount),
            },
          },
        },
      },
      lines: {
        updateMany: {
          where: {
            id: {
              in: lines.map((line: any) => line.id),
            },
          },
          data: {
            quantity: lines[0].quantity,
            cost: {
              update: {
                totalAmount: {
                  update: {
                    amount: String(
                      Number(variant?.price.amount) * lines[0].quantity
                    ),
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return Response.json(cart);
}

export async function DELETE(req: Request) {
  const { cartId, lineIds } = await req.json();

  const cartItems = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
  });

  const line = cartItems?.lines.find((line) => line.id === lineIds[0]);
  const amount =
    Number(cartItems?.cost.totalAmount.amount) -
    Number(line?.cost.totalAmount.amount);

  const cart = await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      totalQuantity: { decrement: line?.quantity },
      cost: {
        update: {
          totalAmount: {
            update: {
              amount: String(amount),
            },
          },
        },
      },
      lines: {
        deleteMany: {
          where: {
            id: {
              in: lineIds.map((lineId: string) => lineId),
            },
          },
        },
      },
    },
  });

  return Response.json(cart);
}
