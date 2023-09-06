import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetRetriveTransactionUseCase } from "@/useCases/@factories/Transaction/makeGetRetriveTransactionUseCase";

export async function getRetriveTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };

    const retrive = makeGetRetriveTransactionUseCase();
    const response = await retrive.process(id);

    return reply.status(200).send(response);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
