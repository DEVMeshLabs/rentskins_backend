import { FastifyInstance } from "fastify";
import { rentValidateTradesPendingGaranteeController } from "./validateTradesPendingGaranteeController";
import { rentValidatePendingTradeReceived } from "./validatePendingTradeReceived";
import { rentValidateTradesPendingController } from "./validateTradesPendingController";
import { validateHistoryTransactionRentController } from "./validateHistoryTransactionRentController";
import { rentValidateTradesPendingReturnController } from "./validateTradesPendingReturnController";
import { validateHistoryTransactionRentReturnSellerController } from "./validateHistoryTransactionRentReturnSellerController";
import { validateHistoryTransactionRentReturnBuyerController } from "./validateHistoryTransactionRentReturnBuyerController";

export async function wsRentRouter(app: FastifyInstance) {
  app.post(
    "/rent/webhook/validate/trade/history/:transactionId",
    validateHistoryTransactionRentController
  );
  app.post(
    "/rent/webhook/validate/trade/history/return/seller/:transactionId",
    validateHistoryTransactionRentReturnSellerController
  );

  app.post(
    "/rent/webhook/validate/trade/history/return/buyer/:transactionId",
    validateHistoryTransactionRentReturnBuyerController
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

  app.post(
    "/rent/webhook/validate/trade/pending/return/:transactionId",
    rentValidateTradesPendingReturnController
  );
}
