import { WalletNotExistsError } from "@/useCases/@errors/Wallet/WalletNotExistsError";
import { makeUpdateWalletValueUseCase } from "@/useCases/@factories/Wallet/makeUpdateWalletValueUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function updateWalletUserValueController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { owner_id } = req.params as { owner_id: string };
  const { type } = req.query as { type: string };
  const { value } = req.body as { value: number };

  try {
    const updateWalletValue = makeUpdateWalletValueUseCase();
    await updateWalletValue.execute(owner_id, type, value);
  } catch (error) {
    if (error instanceof WalletNotExistsError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }

  return reply.status(204).send();
}
