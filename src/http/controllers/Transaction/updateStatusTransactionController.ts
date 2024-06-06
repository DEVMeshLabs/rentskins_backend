import { FastifyRequest, FastifyReply } from "fastify";
import { TransactionNotExistError } from "@/useCases/@errors/Transaction/TransactionNotExistError";
import { makeUpdateStatusTransactionUseCase } from "@/useCases/@factories/Transaction/makeUpdateStatusTransactionUseCase";

export async function updateStatusTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };
    const { status } = req.body as {
      status:
        | "InProgress"
        | "NegotiationSend"
        | "NegociationAccepted"
        | "NegociationRejected";
    };

    const makeUpdateStatus = makeUpdateStatusTransactionUseCase();
    const response = await makeUpdateStatus.execute(id, status);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof TransactionNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
