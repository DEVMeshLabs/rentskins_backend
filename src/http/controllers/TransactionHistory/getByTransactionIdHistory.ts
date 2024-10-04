import { TransactionHistoryNotExistError } from "@/useCases/@errors/TransactionHistory/TransactionHistoryNotExistError";
import { makeGetByTransactionIdHistoryUseCase } from "@/useCases/@factories/TransactionHistory/makeGetByTransactionIdHistoryUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getByTransactionIdHistory(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };

    const getByIdTransaction = makeGetByTransactionIdHistoryUseCase();
    const response = await getByIdTransaction.execute(id);
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof TransactionHistoryNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
