import { WalletNotExistsError } from "@/useCases/@errors/Wallet/WalletNotExistsError";
import { makeGetWalletUserUseCase } from "@/useCases/@factories/Wallet/makeGetWalletUserUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getWalletUserController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { owner_id } = req.params as { owner_id: string };

  try {
    const getWalletUserUseCase = makeGetWalletUserUseCase();
    const response = await getWalletUserUseCase.execute(owner_id);
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof WalletNotExistsError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
