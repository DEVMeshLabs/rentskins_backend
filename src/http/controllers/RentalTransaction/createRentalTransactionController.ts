import { FastifyRequest, FastifyReply } from "fastify";
import createRentalTransactionSchema from "./schemas/createRentalTransactionSchema";
import { makeCreateRentalTransactionUseCase } from "@/useCases/@factories/RentalTransaction/makeCreateRentalTransaction";

export async function createRentalTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const bodySchema = createRentalTransactionSchema;
    const {
      buyerId,
      daysQuantity,
      totalPriceRent,
      totalGuarantee,
      fee,
      skinsRent,
      skinsGuarantee,
    } = bodySchema.parse(req.body);
    const createTransactionRental = makeCreateRentalTransactionUseCase();
    const transaction = await createTransactionRental.execute({
      buyerId,
      totalPriceRent,
      totalGuarantee,
      fee,
      skinsRent,
      daysQuantity,
      skinsGuarantee,
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
