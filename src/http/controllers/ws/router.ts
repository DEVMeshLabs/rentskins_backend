import { FastifyInstance } from "fastify";
import { validateHistoryTradeController } from "./validateHistoryTradeController";
import { validateTradesPendingController } from "./validateTradesPendingController";
import { validatePendingTradeReceived } from "./validatePendingTradeReceived";

export async function wsRouter(app: FastifyInstance) {
  app.post(
    "/webhook/validate/trade/:historyId",
    validateHistoryTradeController
  );
  app.post(
    "/webhook/validate/trade/pending/:transactionId",
    validateTradesPendingController
  );

  app.post(
    "/webhook/validate/trade/pending/received/:transactionId",
    validatePendingTradeReceived
  );
}
