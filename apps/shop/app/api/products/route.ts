import { NextRequest, NextResponse } from "next/server";
import prisma from "lib/prisma";

export async function GET(req: NextRequest) {
  const handle = req.nextUrl.searchParams.get("handle");
  if (handle) {
    const products = await prisma.product.findUnique({
      where: {
        handle,
      },
    });

    return NextResponse.json(products);
  } else {
    const products = await prisma.product.findMany();

    return NextResponse.json(products);
  }
}
