import { FastifyInstance } from "fastify";
import { createTransaction } from "./createTransaction";

export async function skinRouter(app: FastifyInstance) {
  app.post("/v1/transaction", createTransaction);
}
