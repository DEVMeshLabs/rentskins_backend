import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateByIdTransactionRentalUseCase } from "@/useCases/@factories/RentalTransaction/makeUpdateByIdTransactionRentalUseCase";

export async function updateByIdTransactionRentalController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };
    const body = req.body as any;

    const makeUpdateStatus = makeUpdateByIdTransactionRentalUseCase();
    const updateStatus = await makeUpdateStatus.execute(id, body);

    return reply.status(200).send(updateStatus);
  } catch (error) {
    const errorMappings = {
      TransactionNotExistError: 404,
    };

    const status = errorMappings[error.constructor.name] || 500;
    return reply.status(status).send({ error: error.message });
  }
}
