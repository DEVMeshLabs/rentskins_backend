import { FastifyInstance } from "fastify";
import { createWithdrawlRequestController } from "./createWithdrawlRequestController";

export async function withdrawalRequestRouter(app: FastifyInstance) {
  app.post("/v1/withdrawlRequest", createWithdrawlRequestController);
}
