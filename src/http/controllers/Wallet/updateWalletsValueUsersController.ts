import { InsufficientFundsError } from "@/useCases/@errors/Wallet/InsufficientFundsError";
import { WalletNotExistsError } from "@/useCases/@errors/Wallet/WalletNotExistsError";
import { makeUpdateWalletsValueUsersUseCase } from "@/useCases/@factories/Wallet/makeUpdateWalletsValueUsersUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import { ZodError, z } from "zod";

export async function updateWalletsValueUsersController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const updateSchema = z.object({
    id: z.string().uuid(),
    value: z.number(),
    other_id: z.string().uuid(),
  });

  try {
    const updateWalletValue = makeUpdateWalletsValueUsersUseCase();
    const { id, other_id, value } = updateSchema.parse(req.body);
    await updateWalletValue.execute(id, other_id, value);
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(404).send({ error: error.message });
    } else if (error instanceof InsufficientFundsError) {
      return reply.status(400).send({ error: error.message });
    } else if (error instanceof WalletNotExistsError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }

  return reply.status(204).send();
}
