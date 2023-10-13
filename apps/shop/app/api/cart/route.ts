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
  const data = await req.json();
  console.log(data);

  if (data) {
    const product = await prisma.product.findFirst({
      where: {
        variants: { some: { id: data.lines[0].merchandiseId } },
      },
    });
    
    const cart = await prisma.cart.update({
      where: {
        id: data.cartId,
      },
      data: {
        cost: {
          subtotalAmount: {
            amount: "",
            currencyCode: "",
          },
          totalAmount: {
            amount: product?.variants[0]?.price.amount!,
            currencyCode: data.cost.totalAmount.currencyCode,
          },
          totalTaxAmount: {
            amount: "",
            currencyCode: "",
          },
        },
        lines: {
          id: randomUUID(),
          quantity: data.lines[0].quantity,
          cost: {
            totalAmount: {
              amount: product?.variants[0]?.price.amount!,
              currencyCode: product?.variants[0]?.price.currencyCode!,
            },
          },
          merchandise: {
            id: data.lines[0].merchandiseId,
            title: product?.variants[0]?.title!,
            selectedOptions: product?.variants[0]?.selectedOptions,
            product: product!,
          },
        },
        totalQuantity: {increment: data.lines[0].quantity},
      },
    });

    return Response.json(cart);
  } else {
    const cart = await prisma.cart.create({
      data: {
        checkoutUrl: "",
        cost: {
          subtotalAmount: {
            amount: "",
            currencyCode: "",
          },
          totalAmount: {
            amount: "",
            currencyCode: "",
          },
          totalTaxAmount: {
            amount: "",
            currencyCode: "",
          },
        },
        lines: [],
        totalQuantity: 0,
      },
    });

    return Response.json(cart);
  }
}

export async function PATCH(req: Request) {}

export async function DELETE(req: Request) {}
