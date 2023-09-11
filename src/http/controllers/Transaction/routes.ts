import { FastifyInstance } from "fastify";
import { createTransactionController } from "./createTransactionController";
import { getRetriveTransactionController } from "./getRetriveTransactionController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { webhooks } from "@/server";
import { env } from "@/env";
import console from "console";
// app.register(require('@fastify/formbody'))

export async function transactionRouter(app: FastifyInstance) {
  app.post(
    "/v1/transaction",
    { onRequest: verifyJwt },
    createTransactionController
  );
  app.get("/v1/transaction/:id", getRetriveTransactionController);

  await app.register(import("fastify-raw-body"), {
    field: "rawBody",
    global: false, // add the rawBody to every request. **Default true**
    encoding: "utf8", // set it to false to set rawBody as a Buffer **Default utf8**
    runFirst: true, // get the body before any preParsing hook change/uncompress it. **Default false**
  });

  app.post(
    "/v1/transaction/webhook",
    { config: { rawBody: true } },
    (request, reply) => {
      const sig = request.headers["stripe-signature"];
      let event;
      // console.log(sig);
      // console.log(request.body);
      // const rawBody = request.rawBody;

      try {
        event = webhooks.constructEvent(
          request.rawBody,
          sig,
          env.STRIPE_SECRET_WEBHOOK_KEY
        );
        console.log("ok");
      } catch (err) {
        console.log(err.message);
        reply.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      console.log(event.type);

      switch (event.type) {
        case "payment_intent.succeeded":
          // eslint-disable-next-line no-case-declarations
          const paymentIntentSucceeded = event.data.object;
          console.log(paymentIntentSucceeded);

          // eslint-disable-next-line no-case-declarations
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
    }
  );
}
