import { WalletNotExistsError } from "@/useCases/errors/Wallet/WalletNotExistsError";
import { makeDeleteWalletUseCase } from "@/useCases/factories/Wallet/makeDeleteWalletUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function deleteWalletController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    const deleteWallet = makeDeleteWalletUseCase();
    const wallet = await deleteWallet.execute(id);
    return reply.status(200).send(wallet);
  } catch (error) {
    if (error instanceof WalletNotExistsError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
