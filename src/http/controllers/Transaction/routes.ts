import { FastifyInstance } from "fastify";
import { createTransactionController } from "./createTransactionController";

export async function transactionRouter(app: FastifyInstance) {
  app.post("/v1/transaction", createTransactionController);
}
