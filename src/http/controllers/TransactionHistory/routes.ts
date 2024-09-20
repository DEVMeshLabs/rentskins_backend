import { FastifyInstance } from "fastify";
import { getTransactionHistoryIdTransaction } from "./getTransactionHistoryIdTransaction";
import { getManyTransactionHistory } from "./getManyTransactionHistory";

export async function transactionHistoryRouter(app: FastifyInstance) {
  app.get("/v1/transaction/history/:id", getTransactionHistoryIdTransaction);
  app.get("/v1/transaction/history", getManyTransactionHistory);
}
