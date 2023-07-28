import { WalletNotExistsError } from "@/useCases/@errors/Wallet/WalletNotExistsError";
import { makeUpdateWalletValueUseCase } from "@/useCases/@factories/Wallet/makeUpdateWalletValueUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function updateWalletValueController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { owner_id } = req.params as { owner_id: string };

  const updateSchema = z.object({
    value: z.string(),
  });

  try {
    const updateWalletValue = makeUpdateWalletValueUseCase();
    const { value } = updateSchema.parse(req.body);
    await updateWalletValue.execute(owner_id, value);
  } catch (error) {
    if (error instanceof WalletNotExistsError) {
      return reply.status(404).send({ error: error.message });
    } else if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: "Erro de validação", errors: error.errors });
    }
    throw error;
  }

  return reply.status(200).send();
}
