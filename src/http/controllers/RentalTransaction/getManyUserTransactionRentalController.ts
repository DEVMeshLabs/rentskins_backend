import { makeGetManyUserTransactionRental } from "@/useCases/@factories/RentalTransaction/makeGetManyUserRentalTransaction";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyUserTransactionRentalController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { steamId } = req.params as { steamId: string };
    const getManyRentalTransaction = makeGetManyUserTransactionRental();

    const getManyUserTransactions = await getManyRentalTransaction.execute(
      steamId
    );
    return reply.status(200).send(getManyUserTransactions);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
