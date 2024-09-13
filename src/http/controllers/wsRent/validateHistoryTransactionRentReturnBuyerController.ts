import { TransactionHistoryNotExistError } from "@/useCases/@errors/TransactionHistory/TransactionHistoryNotExistError";
import { ValidateTransactionHistoryError } from "@/useCases/@errors/ws/validateTransactionHistoryError";
import { makeValidateTransactionHistoryReturnBuyerUseCase } from "@/useCases/@factories/wsRent/makeValidateTransactionHistoryReturnBuyerUseCase";
import { IGetHistoricTrade } from "@/useCases/ws/interface/getHistoricTrade";
import { FastifyRequest, FastifyReply } from "fastify";

export async function validateHistoryTransactionRentReturnBuyerController(
  req: FastifyRequest<{
    Body: { historic: IGetHistoricTrade };
  }>,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const body = req.body;
  const { transactionId } = req.params as { transactionId: string };

  try {
    const makeValidade = makeValidateTransactionHistoryReturnBuyerUseCase();
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
