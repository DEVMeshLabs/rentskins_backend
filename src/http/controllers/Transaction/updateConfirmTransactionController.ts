import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateConfirmTransactionUseCase } from "@/useCases/@factories/Transaction/makeUpdateConfirmTransactionUseCase";
import { TransactionNotExistError } from "@/useCases/@errors/Transaction/TransactionNotExistError";
import { z } from "zod";
import { NotUpdateTransaction } from "@/useCases/@errors/Transaction/NotUpdateTransaction";

export async function updateConfirmTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };
    const { query } = req.query as { query: string };

    const bodySchema = z.object({
      status: z.enum(["Aceito", "Recusado"]),
    });

    const { status } = bodySchema.parse(req.body);

    const getUser = makeUpdateConfirmTransactionUseCase();
    await getUser.execute(id, status, query);

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof TransactionNotExistError) {
      return reply.status(404).send({ error: error.message });
    } else if (error instanceof NotUpdateTransaction) {
      return reply.status(400).send({ error: error.message });
    }
    throw error;
  }
}
