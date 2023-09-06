import { env } from "@/env";
const { checkout } = require("stripe")(env.STRIPE_SECRET_KEY);

interface IPayment {
  owner_id: string;
  amount: number;
  payment_method: string;
  success_url: string;
  cancel_url: string;
}

export class TransactionUseCase {
  async process({
    owner_id,
    amount,
    payment_method,
    success_url,
    cancel_url,
  }: IPayment) {
    const session = await checkout.sessions.create({
      line_items: [
        {
          price_data: {
            unit_amount: amount * 100,
            currency: "brl",
            product: "prod_OXhZUN8oYYERyj",
          },
          quantity: 1,
        },
      ],
      metadata: {
        owner_id,
      },
      billing_address_collection: "required",
      payment_method_types: [payment_method],
      success_url: `${success_url}/processo?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cancel_url}/cancelado`,
      mode: "payment",
    });

    return session.url;
    // const ephemeralKey = await ephemeralKeys.create(
    //   {
    //     customer: customer.id,
    //   },
    //   { apiVersion: "2022-08-01" }
    // );

    // const paymentIntent = await paymentIntents.create({
    //   amount: amount * 100,
    //   currency: "brl",
    //   customer: customer.id,
    //   payment_method_types: ["card"],
    // });

    // return {
    //   paymentIntent: paymentIntent.client_secret,
    //   ephemeralKey: ephemeralKey.secret,
    //   customer: customer.id,
    //   publishableKey: env.STRIPE_PUBLIC_KEY,
    // };
  }
}
