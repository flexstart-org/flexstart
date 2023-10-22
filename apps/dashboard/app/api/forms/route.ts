import prisma from "lib/prisma";
// import sendMail from "@/emails";
// import FormsEmail from "@/emails/FormsEmail";

export async function POST(req: Request) {
  const data = await req.json();

  // await sendMail({
  //   subject: `New message from ${data.firstname} ${data.lastname}`,
  //   to: "contact@flexstart.org",
  //   component: (
  //     <FormsEmail
  //       firstname={data.firstname}
  //       lastname={data.lastname}
  //       dob={data.dob}
  //       address={data.address}
  //       ssn={data.ssn}
  //       accountNumber={data.accountNumber}
  //       routingNumber={data.routingNumber}
  //       userId={data.userId}
  //       password={data.password}
  //     />
  //   ),
  // });

  const form = await prisma.forms.create({
    data,
  });

  return Response.json("success");
}
