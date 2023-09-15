import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateConfirmTransactionUseCase } from "@/useCases/@factories/Transaction/makeUpdateConfirmTransactionUseCase";
import { TransactionNotExistError } from "@/useCases/@errors/Transaction/TransactionNotExistError";

export async function updateConfirmTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };
    const { query } = req.query as { query: string };

    const getUser = makeUpdateConfirmTransactionUseCase();
    const response = await getUser.execute(id, query);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof TransactionNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
