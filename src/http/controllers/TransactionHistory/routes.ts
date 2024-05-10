import { FastifyInstance } from "fastify";
import { getTransactionHistoryIdTransaction } from "./getTransactionHistoryIdTransaction";

export async function transactionHistoryRouter(app: FastifyInstance) {
  app.get("/v1/transaction/history/:id", getTransactionHistoryIdTransaction);
}
