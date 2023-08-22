import { PerfilNotExistError } from "@/useCases/@errors/Perfil/PerfilInfoNotExistError";
import { WalletAlreadyExistError } from "@/useCases/@errors/Wallet/WalletAlreadyExistsError";
import { makeCreateWalletUseCase } from "@/useCases/@factories/Wallet/makeCreateWalletUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function createWalletController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const createWalletSchema = z.object({
    owner_id: z.string().max(17),
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
    } else if (error instanceof WalletAlreadyExistError) {
      return reply.status(409).send({ errors: error.message });
    } else if (error instanceof PerfilNotExistError) {
      return reply.status(404).send({ errors: error.message });
    }
    return reply.status(500).send({ message: "Erro interno do servidor" });
  }
  return reply.status(201).send();
}
