import { FastifyInstance } from "fastify";
import { createTransactionController } from "./createTransactionController";
import { getRetriveTransactionController } from "./getRetriveTransactionController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { webhooks } from "@/server";
import { env } from "@/env";

export async function transactionRouter(app: FastifyInstance) {
  app.post(
    "/v1/transaction",
    { onRequest: verifyJwt },
    createTransactionController
  );
  app.get("/v1/transaction/:id", getRetriveTransactionController);

  app.post("/v1/transaction/webhook", (request, reply) => {
    const sig = request.headers["stripe-signature"];
    let event;
    console.log(sig);
    console.log(request.body);

    try {
      event = webhooks.constructEvent(
        request.body,
        sig,
        env.STRIPE_SECRET_WEBHOOK_KEY
      );
    } catch (err) {
      reply.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    // console.log(event.type);
    // console.log(event.data.object);

    switch (event.type) {
      case "payment_intent.succeeded":
        // eslint-disable-next-line no-case-declarations
        const paymentIntentSucceeded = event.data.object;
        console.log(
          "AQUIIIIIIIIIIIIIIIIIIIIIIII",
          paymentIntentSucceeded.data.object.customer
        );
        return reply.status(200).send(paymentIntentSucceeded);

      // ... handle other event types
      case "payment_intent.payment_failed":
        // eslint-disable-next-line no-case-declarations
        const paymentIntentFailed = event.data.object;

        // const paymentIntent = await stripe.paymentIntents.retrieve(
        //   "pi_3Nkb38Dc1nUAjpNx30MbCGA6"
        // );
        // console.log(paymentIntent);

        console.log(paymentIntentFailed);
        return reply.status(402).send(paymentIntentFailed);
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    reply.send();
  });
}
