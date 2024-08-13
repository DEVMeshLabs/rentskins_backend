import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateStatusTransactionRentalUseCase } from "@/useCases/@factories/RentalTransaction/makeUpdateStatusTransactionRentalUseCase";

export async function updateStatusTransactionRentalController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };
    const { status } = req.body as any;
    const { steamid } = req.user as any;

    if (steamid !== "76561198862407248") {
      return reply.status(403).send({
        error: "You do not have permission to do this action",
      });
    }

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
