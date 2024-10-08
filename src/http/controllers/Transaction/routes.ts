/* eslint-disable no-case-declarations */
import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { createWebHookTransactionController } from "./createWebHookTransactionController";
import { createCheckoutSessionStripeController } from "./createCheckoutSessionStripeController";
import { createTransactionController } from "./createTransactionController";
import { getManyTransactionController } from "./getManyTransactionController";
import { getUserTransactionController } from "./getUserTransactionController";
import { isVacBanController } from "./isVacBanController";
import { createPixTransactionController } from "./createPixTransactionController";
import { createWebHookPixController } from "./createWebHookPixController";
import { getIdTransactionController } from "./getIdTransactionController";
import { updateStatusTransactionController } from "./updateStatusTransactionController";

export async function transactionRouter(app: FastifyInstance) {
  app.get("/v1/transaction/:id", getUserTransactionController);
  app.get("/v1/transaction/send/:id", getIdTransactionController);
  app.get("/v1/transaction", getManyTransactionController);
  app.get("/v1/verify/vac/:id", isVacBanController);
  // app.patch(
  //   "/v1/transaction/:id",
  //   { onRequest: verifyJwt },
  //   updateConfirmTransactionController
  // );
  app.patch("/v1/transaction/status/:id", updateStatusTransactionController);
  app.post(
    "/v1/transaction",
    { onRequest: verifyJwt },
    createTransactionController
  );

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

  app.post("/v1/transaction/pix", createPixTransactionController);

  app.post(
    "/v1/transaction/webhook/pix",
    { onRequest: [verifyJwt] },
    createWebHookPixController
  );
}
