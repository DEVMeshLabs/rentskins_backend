import { TransactionHistoryNotExistError } from "@/useCases/@errors/TransactionHistory/TransactionHistoryNotExistError";
import { makeGetByIdTransactionHistoryTransUseCase } from "@/useCases/@factories/TransactionHistory/makeGetByIdTransactionHistoryTransUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getByIdTransactionHistory(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };

    const getByIdTransaction = makeGetByIdTransactionHistoryTransUseCase();
    const response = await getByIdTransaction.execute(id);
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof TransactionHistoryNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
