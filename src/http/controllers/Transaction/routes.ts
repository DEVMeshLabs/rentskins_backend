/* eslint-disable no-case-declarations */
import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { createWebHookTransactionController } from "./createWebHookTransactionController";
import { createCheckoutSessionStripeController } from "./createCheckoutSessionStripeController";
import { createTransactionController } from "./createTransactionController";
import { getManyTransactionController } from "./getManyTransactionController";
import { getUserTransactionController } from "./getUserTransactionController";
import { updateConfirmTransactionController } from "./updateConfirmTransactionController";

export async function transactionRouter(app: FastifyInstance) {
  app.get("/v1/transaction/:id", getUserTransactionController);
  app.get("/v1/transaction", getManyTransactionController);

  app.patch("/v1/transaction/:id", updateConfirmTransactionController);
  app.post("/v1/transaction", createTransactionController);

  app.post(
    "/v1/transaction/checkout",
    { onRequest: verifyJwt },
    createCheckoutSessionStripeController
  );
  // Se retirar daqui, vai da erro
  await app.register(import("fastify-raw-body"), {
    field: "rawBody",
    global: false,
    encoding: "utf8",
    runFirst: true,
  });

  app.post(
    "/v1/transaction/webhook",
    { config: { rawBody: true } },
    createWebHookTransactionController
  );
}
