/* eslint-disable no-case-declarations */
import { FastifyInstance } from "fastify";
import { createTransactionController } from "./createTransactionController";
import { getRetriveTransactionController } from "./getRetriveTransactionController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { createWebHookTransactionController } from "./createWebHookTransactionController";

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
    createWebHookTransactionController
    // async (request, reply) => {
    //   const sig = request.headers["stripe-signature"];
    //   let event;

    //   try {
    //     event = webhooks.constructEvent(
    //       request.rawBody,
    //       sig,
    //       env.STRIPE_SECRET_WEBHOOK_KEY
    //     );
    //     console.log("ok");
    //   } catch (err) {
    //     console.log(err.message);
    //     reply.status(400).send(`Webhook Error: ${err.message}`);
    //     return;
    //   }
    //   console.log(event.type);

    //   switch (event.type) {
    //     case "payment_intent.succeeded":
    //       const paymentIntentSucceeded = event.data.object;
    //       console.log(paymentIntentSucceeded);

    //       const customer = await customers.retrieve(
    //         paymentIntentSucceeded.customer
    //       );
    //       console.log(customer);
    //       break;

    //     // ... handle other event types
    //     case "payment_intent.payment_failed":
    //       const paymentIntentFailed = event.data.object;

    //       console.log(paymentIntentFailed);
    //       break;
    //     default:
    //       console.log(`Unhandled event type ${event.type}`);
    //   }
    //   reply.send();
    // }
  );
}
