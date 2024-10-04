import { makeGetManyTransactionHistoryUseCase } from "@/useCases/@factories/TransactionHistory/makeGetManyTransactionHistoryUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyTransactionHistory(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const getByIdTransaction = makeGetManyTransactionHistoryUseCase();
    const response = await getByIdTransaction.execute();
    return reply.status(200).send(response);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
