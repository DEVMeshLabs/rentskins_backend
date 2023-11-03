import { makeGetManyWalletUseCase } from "@/useCases/@factories/Wallet/makeGetManyWalletUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyWalletController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const getManyWallet = makeGetManyWalletUseCase();
    const response = await getManyWallet.execute();
    return reply.status(200).send(response);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
