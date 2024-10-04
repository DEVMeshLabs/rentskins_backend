import { makegetManyWithdrawnlRequestUseCase } from "@/useCases/@factories/WithdrawnlRequest/makeGetManyWithdrawnlRequestUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyWithdrawlRequestController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const getManyWithdrawl = makegetManyWithdrawnlRequestUseCase();
    const response = await getManyWithdrawl.execute();
    return reply.status(200).send(response);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
