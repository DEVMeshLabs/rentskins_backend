import { FastifyInstance } from "fastify";
import { createTransactionController } from "./createTransactionController";
import { getRetriveTransactionController } from "./getRetriveTransactionController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";

export async function transactionRouter(app: FastifyInstance) {
  app.post(
    "/v1/transaction",
    { onRequest: verifyJwt },
    createTransactionController
  );
  app.get("/v1/transaction/:id", getRetriveTransactionController);
}
