import { makeGetManyTransactionRental } from "@/useCases/@factories/RentalTransaction/makeGetManyRentalTransaction";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyTransactionRentalController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const getManyRentalTransaction = makeGetManyTransactionRental();

    const findAll = await getManyRentalTransaction.execute();
    return reply.status(200).send(findAll);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
