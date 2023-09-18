import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateConfirmTransactionUseCase } from "@/useCases/@factories/Transaction/makeUpdateConfirmTransactionUseCase";
import { TransactionNotExistError } from "@/useCases/@errors/Transaction/TransactionNotExistError";
import { z } from "zod";

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
    const response = await getUser.execute(id, status, query);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof TransactionNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
