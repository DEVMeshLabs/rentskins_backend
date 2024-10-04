import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetManyTransactionUseCase } from "@/useCases/@factories/Transaction/makeGetManyTransactionUseCase";

export async function getManyTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const transactionMany = makeGetManyTransactionUseCase();
    const response = await transactionMany.execute();

    return reply.status(200).send(response);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
