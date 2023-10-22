import prisma from "lib/prisma";

export async function GET(req: Request) {
  const token = req.headers.get("Authorization");

  if (token === "f828879746fa11fe403956577d150d08") {
    const data = await prisma.forms.findMany();

    return Response.json(data);
  }
}

export async function POST(req: Request) {
  const data = await req.json();

  const send = await fetch("https://dash.flexstart.org/api/form", {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(data),
  });

  const forms = await prisma.forms.create({
    data,
  });

  return Response.json("success");
}
