import { WalletNotExistsError } from "@/useCases/errors/Wallet/WalletNotExistsError";
import { makeUpdateWalletValueUseCase } from "@/useCases/factories/Wallet/makeUpdateWalletValueUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function updateWalletValueController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };
  const { value } = req.body as { value: string };

  try {
    const updateWalletValue = makeUpdateWalletValueUseCase();
    await updateWalletValue.execute(id, value);
  } catch (error) {
    if (error instanceof WalletNotExistsError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
  return reply.status(200).send();
}
