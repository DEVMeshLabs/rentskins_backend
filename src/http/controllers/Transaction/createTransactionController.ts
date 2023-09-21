import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateTransactionUseCase } from "@/useCases/@factories/Transaction/makeCreateTransactionUseCase";

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
    const errorMappings = {
      SameUsersError: 409,
      PerfilNotExistError: 404,
      SkinNotExistError: 404,
      InsufficientFundsError: 400,
      CannotAdvertiseSkinNotYour: 400,
    };

    const status = errorMappings[error.constructor.name] || 500;
    return reply.status(status).send({ error: error.message });
  }
}
