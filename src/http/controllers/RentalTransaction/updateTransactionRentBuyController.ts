import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateTransactionRentalBuyUseCase } from "@/useCases/@factories/RentalTransaction/makeUpdateTransactionRentalBuyUseCase";

export async function updateTransactionRentalBuyController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };

    const makeUpdateStatus = makeUpdateTransactionRentalBuyUseCase();
    const updateStatus = await makeUpdateStatus.execute(id);

    return reply.status(200).send(updateStatus);
  } catch (error) {
    const errorMappings = {
      TransactionNotExistError: 404,
    };

    const status = errorMappings[error.constructor.name] || 500;
    return reply.status(status).send({ error: error.message });
  }
}
