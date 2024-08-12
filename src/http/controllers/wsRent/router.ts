import { FastifyInstance } from "fastify";
import { rentValidateHistoryTradeController } from "./validateHistoryTradeController";
import { rentValidateTradesPendingController } from "./validateTradesPendingController";
import { rentValidatePendingTradeReceived } from "./validatePendingTradeReceived";

export async function wsRentRouter(app: FastifyInstance) {
  app.post(
    "rent/webhook/validate/trade/:transactionId",
    rentValidateHistoryTradeController
  );
  app.post(
    "rent/webhook/validate/trade/pending/:transactionId",
    rentValidateTradesPendingController
  );

  app.post(
    "rent/webhook/validate/trade/pending/received/:transactionId",
    rentValidatePendingTradeReceived
  );
}
