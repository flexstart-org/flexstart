import { NextApiRequest, NextApiResponse } from "next";
import sendMail from "@/emails";
import ContactEmail from "@/emails/ContactEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstname, lastname, company, email, number, message } = req.body;

    await sendMail({
      subject: `New message from ${firstname} ${lastname}`,
      to: "contact@flexstart.org",
      component: (
        <ContactEmail
          company={company}
          email={email}
          number={number}
          message={message}
        />
      ),
    });

    return res.status(200).json("success");
  }
}
