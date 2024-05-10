import { makeGetByIdTransactionHistoryTransUseCase } from "@/useCases/@factories/TransactionHistory/makeGetByIdTransactionHistoryTransUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getTransactionHistoryIdTransaction(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };

    const getByIdTransaction = makeGetByIdTransactionHistoryTransUseCase();
    const response = await getByIdTransaction.execute(id);
    return reply.status(200).send(response);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
