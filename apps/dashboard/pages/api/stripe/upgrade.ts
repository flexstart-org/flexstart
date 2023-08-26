import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { stripe } from "@/lib/stripe";
import { Session } from "@/lib/types";

export default async function upgradePlan(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = (await getServerSession(req, res, authOptions)) as Session;

  if (req.method === "POST") {
    const { priceId } = req.query as { priceId: string };

    const stripeSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email,
      billing_address_collection: "required",
      success_url: `${
        process.env.NODE_ENV === "production"
          ? "https://flexstart.org"
          : "http://localhost:3000"
      }/usage?success=true`,
      cancel_url: `${
        process.env.NODE_ENV === "production"
          ? "https://flexstart.org"
          : "http://localhost:3000"
      }/usage`,
      line_items: [{ price: priceId, quantity: 1 }],
      // automatic_tax: {
      //   enabled: true,
      // },
      tax_id_collection: {
        enabled: true,
      },
      mode: "subscription",
      allow_promotion_codes: true,
      client_reference_id: session.user.id,
    });
    return res.status(200).json(stripeSession);
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
