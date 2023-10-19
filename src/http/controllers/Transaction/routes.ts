/* eslint-disable no-case-declarations */
import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { createWebHookTransactionController } from "./createWebHookTransactionController";
import { createCheckoutSessionStripeController } from "./createCheckoutSessionStripeController";
import { createTransactionController } from "./createTransactionController";
import { getManyTransactionController } from "./getManyTransactionController";
import { getUserTransactionController } from "./getUserTransactionController";
import { updateConfirmTransactionController } from "./updateConfirmTransactionController";
import { isVacBanController } from "./isVacBanController";
import { getManyLastSalesUserUseCase } from "./getManyLastSalesUserUseCase";
import { createPixTransactionController } from "./createPixTransactionController";
import axios from "axios";
import { env } from "process";

export async function transactionRouter(app: FastifyInstance) {
  app.get("/v1/transaction/:id", getUserTransactionController);
  app.get("/v1/transaction", getManyTransactionController);
  app.get("/v1/verify/vac/:id", isVacBanController);
  app.get("/v1/transaction/last/sales/:seller_id", getManyLastSalesUserUseCase);
  app.patch(
    "/v1/transaction/:id",
    { onRequest: verifyJwt },
    updateConfirmTransactionController
  );
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

  app.post("/v1/transaction/webhook/pix", async (req: any, reply) => {
    console.log("Aqui");

    if (req.body) {
      console.log(req.body);
      switch (req.body.type) {
        case "payment": {
          console.log("Tipo: pagamento");
          if (req.body.action === "payment.created") {
            console.log("Pix create");
          }
          if (req.body.action === "payment.updated") {
            const id = req.body.data.id;

            const getPayment = await axios.get(
              `https://api.mercadopago.com/v1/payments/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${env.MERCADO_SECRET_KEY}`,
                },
              }
            );
            console.log(getPayment);
          }
        }
      }
    }

    return reply.status(200).send("Ok");
  });
}
