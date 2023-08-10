import { WalletNotExistsError } from "@/useCases/@errors/Wallet/WalletNotExistsError";
import { makeGetWalletUseCase } from "@/useCases/@factories/Wallet/makeGetWalletUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getWalletController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    const getWalletUseCase = makeGetWalletUseCase();
    const response = await getWalletUseCase.execute(id);
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof WalletNotExistsError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
