import { makeCreateWalletUseCase } from "@/useCases/factories/Wallet/makeCreateWalletUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function createWalletController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const data = req.body;

  try {
    const createWallet = makeCreateWalletUseCase();
    await createWallet.execute(data);
  } catch (error) {
    console.log(error);
  }
  return reply.status(201).send();
}
