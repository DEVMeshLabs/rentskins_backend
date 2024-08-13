import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateStatusTransactionRentalUseCase } from "@/useCases/@factories/RentalTransaction/makeUpdateStatusTransactionRentalUseCase";

export async function updateStatusTransactionRentalController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };
    const { status } = req.body as any;
    const makeUpdateStatus = makeUpdateStatusTransactionRentalUseCase();
    const updateStatus = await makeUpdateStatus.execute(id, status);

    console.log(updateStatus);
    return reply.status(201).send(updateStatus);
  } catch (error) {
    const errorMappings = {
      TransactionNotExistError: 404,
    };

    const status = errorMappings[error.constructor.name] || 500;
    return reply.status(status).send({ error: error.message });
  }
}
