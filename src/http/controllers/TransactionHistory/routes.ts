import { FastifyInstance } from "fastify";
import { getByIdTransactionHistory } from "./getByIdTransactionHistory";
import { getManyTransactionHistory } from "./getManyTransactionHistory";
import { getByTransactionIdHistory } from "./getByTransactionIdHistory";

export async function transactionHistoryRouter(app: FastifyInstance) {
  app.get("/v1/transaction/history/:id", getByIdTransactionHistory);
  app.get("/v1/history/transaction/:id", getByTransactionIdHistory);
  app.get("/v1/transaction/history", getManyTransactionHistory);
}
