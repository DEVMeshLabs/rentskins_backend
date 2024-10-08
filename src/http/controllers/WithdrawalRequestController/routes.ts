import { FastifyInstance } from "fastify";
import { createWithdrawlRequestController } from "./createWithdrawlRequestController";
import { getManyWithdrawlRequestController } from "./getManyWithdrawlRequestController";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { updateStatusUserWithdrawalRequestController } from "./updateStatusUserWithdrawalRequestController";

export async function withdrawalRequestRouter(app: FastifyInstance) {
  app.post(
    "/v1/withdrawlRequest",
    { onRequest: verifyJwt },
    createWithdrawlRequestController
  );
  app.get("/v1/withdrawlRequest", getManyWithdrawlRequestController);
  app.patch(
    "/v1/withdrawlRequest",
    updateStatusUserWithdrawalRequestController
  );
}
