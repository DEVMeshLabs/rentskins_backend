import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateGuaranteeConfirmedUseCase } from "@/useCases/@factories/RentalTransaction/makeUpdateGuaranteeConfirmedUseCase";

export async function updateGuaranteeConfirmedController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };

    const makeUpdateStatus = makeUpdateGuaranteeConfirmedUseCase();
    const updateStatus = await makeUpdateStatus.execute(id);

    return reply.status(200).send(updateStatus);
  } catch (error) {
    const errorMappings = {
      TransactionNotExistError: 404,
      StatusHasAlreadyBeenUpdatedError: 400,
    };

    const status = errorMappings[error.constructor.name] || 500;
    return reply.status(status).send({ error: error.message });
  }
}
