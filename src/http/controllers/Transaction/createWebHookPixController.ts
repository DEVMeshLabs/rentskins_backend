import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateWebHookPixUseCase } from "@/useCases/@factories/Transaction/makeCreateWebHookPixUseCase";

export async function createWebHookPixController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const webHook = makeCreateWebHookPixUseCase();
    const response = await webHook.execute(req);

    return reply.status(200).send(response);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
