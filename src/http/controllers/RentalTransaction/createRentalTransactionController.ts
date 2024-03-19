import { FastifyRequest, FastifyReply } from "fastify";
import createRentalTransactionSchema from "./schemas/createRentalTransactionSchema";
import { makeCreateRentalTransactionUseCase } from "@/useCases/@factories/RentalTransaction/makeCreateRentalTransaction";

export async function createRentalTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const bodySchema = createRentalTransactionSchema;
    const { owner_id, skin_id, days_quantity } = bodySchema.parse(req.body);

    const createTransaction = makeCreateRentalTransactionUseCase();
    const transaction = await createTransaction.execute({
      owner_id,
      skin_id,
      days_quantity,
    });

    return reply.status(201).send(transaction);
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
    };

    const status = errorMappings[error.constructor.name] || 500;
    return reply.status(status).send({ error: error.message });
  }
}
