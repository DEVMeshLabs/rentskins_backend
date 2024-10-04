import { FastifyRequest, FastifyReply } from "fastify";
import { createRentalTransactionSchema } from "./schemas/createRentalTransactionSchema";
import { makeCreateTransactionRentalUseCase } from "@/useCases/@factories/RentalTransaction/makeCreateRentalTransaction";

export async function createTransactionRentalController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const bodySchema = createRentalTransactionSchema;
    const {
      buyerId,
      daysQuantity,
      totalPriceRent,
      totalPriceSkins,
      fee,
      skinsRent,
      skinsGuarantee,
    } = bodySchema.parse(req.body);
    const createTransactionRental = makeCreateTransactionRentalUseCase();
    const transaction = await createTransactionRental.execute({
      buyerId,
      totalPriceRent,
      totalPriceSkins,
      fee,
      skinsRent,
      daysQuantity: Number(daysQuantity),
      skinsGuarantee: skinsGuarantee as any,
    });
    console.log(transaction);
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
