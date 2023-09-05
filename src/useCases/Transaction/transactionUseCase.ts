import { env } from "@/env";

const { checkout } = require("stripe")(env.STRIPE_SECRET_KEY);

interface IPayment {
  owner_id: string;
  amount: number;
}

export class TransactionUseCase {
  async process({ owner_id, amount }: IPayment) {
    // const customer = await customers.create({
    //   metadata: {
    //     owner_id: "teste_01",
    //   },
    // });

    const session = await checkout.sessions.create({
      success_url: `https://rentskins-testing.vercel.app?sucess`,
      line_items: [{ price: "price_1NkcAUDc1nUAjpNxbLL0BD0K", quantity: 1 }],
      metadata: {
        owner_id,
      },
      payment_method_types: ["card", "boleto"],
      mode: "payment",
    });

    return session;
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
