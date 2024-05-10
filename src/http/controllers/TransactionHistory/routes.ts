import { FastifyInstance } from "fastify";
import { getTransactionHistoryIdTransaction } from "./getTransactionHistoryIdTransaction";

export async function transactionHistory(app: FastifyInstance) {
  app.post("/v1/transaction/history", getTransactionHistoryIdTransaction);
}
