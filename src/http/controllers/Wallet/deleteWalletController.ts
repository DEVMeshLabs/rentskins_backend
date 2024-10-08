import { WalletNotExistsError } from "@/useCases/@errors/Wallet/WalletNotExistsError";
import { makeDeleteWalletUseCase } from "@/useCases/@factories/Wallet/makeDeleteWalletUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function deleteWalletController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { id } = req.params as { id: string };

  try {
    const deleteWalletUseCase = makeDeleteWalletUseCase();
    const wallet = await deleteWalletUseCase.execute(id);
    return reply.status(204).send(wallet);
  } catch (error) {
    if (error instanceof WalletNotExistsError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
