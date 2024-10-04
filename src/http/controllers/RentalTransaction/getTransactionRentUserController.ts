import { makeGetTransactionRentuserUseCase } from "@/useCases/@factories/RentalTransaction/makeGetTransactionRentuserUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getTransactionRentUserController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { steamId } = req.params as { steamId: string };
    const getManyRentalTransaction = makeGetTransactionRentuserUseCase();

    const getManyUserTransactions = await getManyRentalTransaction.execute(
      steamId
    );
    return reply.status(200).send(getManyUserTransactions);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
