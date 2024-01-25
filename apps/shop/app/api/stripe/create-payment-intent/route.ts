const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  // const { line_items, return_url } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: "1",
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return Response.json({
    clientSecret: paymentIntent.client_secret,
  });
}
