import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { validateHistoryTradeController } from "./validateHistoryTradeController";

export async function wsRouter(app: FastifyInstance) {
  app.post(
    "/webhook/validate/trade/:historyId",
    validateHistoryTradeController
  );
  app.post(
    "/webhook/validate/send/:transactionId",
    validateHistoryTradeController
  );

  app.post(
    "/webhook/validate/trade/pending",
    (req: FastifyRequest, reply: FastifyReply) => {
      const body = req.body;
      console.log(body);
      return reply.status(200).send({ message: body });
    }
  );
}
