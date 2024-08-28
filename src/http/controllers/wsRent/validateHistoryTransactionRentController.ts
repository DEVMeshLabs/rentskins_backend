import { TransactionHistoryNotExistError } from "@/useCases/@errors/TransactionHistory/TransactionHistoryNotExistError";
import { ValidateTransactionHistoryError } from "@/useCases/@errors/ws/validateTransactionHistoryError";
import { makeValidateTransactionRentHistoryUseCase } from "@/useCases/@factories/wsRent/makeValidateTransactionRentHistoryUseCase";
import { IGetHistoricTrade } from "@/useCases/ws/interface/getHistoricTrade";
import { FastifyRequest, FastifyReply } from "fastify";

export async function validateHistoryTransactionRentController(
  req: FastifyRequest<{
    Body: { historic: IGetHistoricTrade };
  }>,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const body = req.body;
  const { transactionId } = req.params as { transactionId: string };

  try {
    const makeValidade = makeValidateTransactionRentHistoryUseCase();
    const validate = await makeValidade.execute(transactionId, body as any);
    return reply.status(200).send(validate);
  } catch (error) {
    if (error instanceof ValidateTransactionHistoryError) {
      return reply.status(404).send({ message: error.message });
    } else if (error instanceof TransactionHistoryNotExistError) {
      return reply.status(404).send({ message: error.message });
    }
  }
  return reply.status(500).send({ message: "Internal Server Error" });
}