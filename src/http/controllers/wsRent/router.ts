import { FastifyInstance } from "fastify";
import { rentValidateHistoryTradeController } from "./validateHistoryTradeController";
import { rentValidateTradesPendingGaranteeController } from "./validateTradesPendingGaranteeController";
import { rentValidatePendingTradeReceived } from "./validatePendingTradeReceived";
import { rentValidateTradesPendingController } from "./validateTradesPendingController";

export async function wsRentRouter(app: FastifyInstance) {
  app.post(
    "/rent/webhook/validate/trade/:transactionId",
    rentValidateHistoryTradeController
  );
  app.post(
    "/rent/webhook/validate/trade/pending/garantee/:transactionId",
    rentValidateTradesPendingGaranteeController
  );

  app.post(
    "/rent/webhook/validate/trade/pending/:transactionId",
    rentValidateTradesPendingController
  );

  app.post(
    "/rent/webhook/validate/trade/pending/received/:transactionId",
    rentValidatePendingTradeReceived
  );
}
