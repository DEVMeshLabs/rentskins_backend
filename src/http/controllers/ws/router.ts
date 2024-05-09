import { FastifyInstance } from "fastify";
import { validateHistoryTradeController } from "./validateHistoryTradeController";

export async function wsRouter(app: FastifyInstance) {
  app.post(
    "/webhook/validate/trade/:historyId",
    validateHistoryTradeController
  );
}
