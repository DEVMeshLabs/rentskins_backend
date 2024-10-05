import { FastifyInstance } from "fastify";
import { validateHistoryTradeController } from "./validateHistoryTradeController";
import { validateTradesPendingController } from "./validateTradesPendingController";
import { validatePendingTradeReceived } from "./validatePendingTradeReceived";

export async function wsRouter(app: FastifyInstance) {
  app.post(
    "/v1/webhook/validate/trade/:transactionId",
    validateHistoryTradeController
  );
  app.post(
    "/v1/webhook/validate/trade/pending/:transactionId",
    validateTradesPendingController
  );

  app.post(
    "/v1/webhook/validate/trade/pending/received/:transactionId",
    validatePendingTradeReceived
  );
}
