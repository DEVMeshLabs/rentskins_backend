import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateTransactionUseCase } from "@/useCases/@factories/Transaction/makeCreateTransactionUseCase";
import { SameUsersError } from "@/useCases/@errors/Skin/SameUsersError";
import { PerfilNotExistError } from "@/useCases/@errors/Perfil/PerfilInfoNotExistError";
import { SkinNotExistError } from "@/useCases/@errors/Skin/SkinNotExistsError";
import { InsufficientFundsError } from "@/useCases/@errors/Wallet/InsufficientFundsError";

export async function createTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { skin_id, buyer_id, seller_id } = req.body as {
      skin_id: string;
      buyer_id: string;
      seller_id: string;
    };

    const createTransaction = makeCreateTransactionUseCase();
    const response = await createTransaction.execute({
      skin_id,
      buyer_id,
      seller_id,
    });

    return reply.status(201).send(response);
  } catch (error) {
    if (error instanceof SameUsersError) {
      return reply.status(409).send({ error: error.message });
    } else if (error instanceof PerfilNotExistError) {
      return reply.status(404).send({ error: error.message });
    } else if (error instanceof SkinNotExistError) {
      return reply.status(404).send({ error: error.message });
    } else if (error instanceof InsufficientFundsError) {
      return reply.status(400).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
