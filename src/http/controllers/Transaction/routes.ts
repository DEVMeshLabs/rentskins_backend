import { FastifyInstance } from "fastify";
import { createTransactionController } from "./createTransactionController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { getRetriveTransactionController } from "./getRetriveTransactionController";

export async function transactionRouter(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);
  app.post("/v1/transaction", createTransactionController);
  app.get("/v1/transaction/:id", getRetriveTransactionController);
}
