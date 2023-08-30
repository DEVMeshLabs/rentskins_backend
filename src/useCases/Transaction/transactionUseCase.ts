import { env } from "@/env";

const stripe = require("stripe")(env.STRIPE_SECRET_KEY);

// interface ICartao {
//   object: string;
//   number: string;
//   exp_month: number;
//   exp_year: number;
//   cvc: string;
// }

export class TransactionUseCase {
  async process(amount: number) {
    const customer = await stripe.customers.create({
      metadata: {
        owner_id: "teste_01",
      },
    });
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {
        customer: customer.id,
      },
      { apiVersion: "2022-08-01" }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "brl",
      customer: customer.id,
      payment_method_types: ["card"],
    });

    console.log({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey:
        "pk_test_51MtcTFDc1nUAjpNxkGLHFtTtO2kifE7jXp5bTEmIxPtdhdclw0DBDD6MnCh5FKCMgHn0qpR6KahPEGJOvdsREtUz00Ra0tvyFK",
    });

    return {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: env.STRIPE_PUBLIC_KEY,
    };
  }
}
