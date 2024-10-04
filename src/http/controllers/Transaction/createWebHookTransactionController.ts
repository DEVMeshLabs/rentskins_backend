import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateWebHookTransactionUseCase } from "@/useCases/@factories/Transaction/makeCreateWebHookTransactionUseCase";
import { webhooks } from "@/server";
import { env } from "@/env";

export async function createWebHookTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const sig = req.headers["stripe-signature"];

    const event = webhooks.constructEvent(
      req.rawBody,
      sig,
      env.STRIPE_SECRET_WEBHOOK_KEY
    );

    const webHook = makeCreateWebHookTransactionUseCase();
    const response = await webHook.process(event);
    console.log(response);
    return reply.status(200).send(response);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
