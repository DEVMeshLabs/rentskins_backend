import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetIdTransactionUseCase } from "@/useCases/@factories/Transaction/makeGetIdTransactionUseCase";
import { TransactionNotExistError } from "@/useCases/@errors/Transaction/TransactionNotExistError";

export async function getIdTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };

    const getUser = makeGetIdTransactionUseCase();
    const response = await getUser.execute(id);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof TransactionNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
