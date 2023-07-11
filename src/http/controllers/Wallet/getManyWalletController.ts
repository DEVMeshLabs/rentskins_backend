import { makeGetManyWalletUseCase } from "@/useCases/factories/Wallet/makeGetManyWalletUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getManyWalletController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getManyWallet = makeGetManyWalletUseCase();
    const wallet = await getManyWallet.execute();
    return reply.status(201).send(wallet);
  } catch (error) {
    console.log(error);
  }
}
