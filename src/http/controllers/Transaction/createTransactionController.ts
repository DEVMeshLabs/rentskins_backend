import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateTransactionUseCase } from "@/useCases/@factories/Transaction/makeCreateTransactionUseCase";
import { createTransactionSchema } from "./Schemas/createTransactionSchema";

export async function createTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const transactions = createTransactionSchema.parse(req.body);
    const makeCreateTransactions = makeCreateTransactionUseCase();

    const createManyTransaction = transactions.map(
      async ({ skin_id, buyer_id, seller_id }) =>
        await makeCreateTransactions.execute({ skin_id, buyer_id, seller_id })
    );

    await Promise.all([...createManyTransaction]);
  } catch (error) {
    const errorMappings = {
      SameUsersError: 409,
      PerfilNotExistError: 404,
      SkinNotExistError: 404,
      InsufficientFundsError: 400,
      CannotAdvertiseSkinNotYour: 400,
      SkinHasAlreadyBeenSoldError: 409,
      WalletNotExistsError: 404,
      GetInventoryOwnerIdError: 429,
      KeySteamNotFoundError: 404,
    };

    const status = errorMappings[error.constructor.name] || 500;
    return reply.status(status).send({ error: error.message });
  }

  return reply.status(201).send();
}
