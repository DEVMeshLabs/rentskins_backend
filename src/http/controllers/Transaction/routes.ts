import { FastifyInstance } from "fastify";
import { createTransactionController } from "./createTransactionController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";

export async function transactionRouter(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);
  app.post("/v1/transaction", createTransactionController);
}
