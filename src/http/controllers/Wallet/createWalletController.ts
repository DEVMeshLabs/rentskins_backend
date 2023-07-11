import { makeCreateWalletUseCase } from "@/useCases/factories/Wallet/makeCreateWalletUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function createWalletController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const createWalletSchema = z.object({
    owner_id: z.string(),
    owner_name: z.string(),
  });

  try {
    const { owner_id, owner_name } = createWalletSchema.parse(req.body);
    const createWallet = makeCreateWalletUseCase();
    await createWallet.execute({ owner_id, owner_name });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: "Erro de validação", errors: error.errors });
    }
    return reply.status(500).send({ message: "Erro interno do servidor" });
  }
  return reply.status(201).send();
}
