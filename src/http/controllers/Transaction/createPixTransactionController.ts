import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreatePixTransactionUseCase } from "@/useCases/@factories/Transaction/makeCreatePixTransactionUseCase";
import { createPixTransactionSchema } from "./Schemas/createPixTransactionSchema";

export async function createPixTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { owner_id, amount, description } = createPixTransactionSchema.parse(
      req.body
    );
    const makeCreatePixTransactions = makeCreatePixTransactionUseCase();

    const response = await makeCreatePixTransactions.execute(
      owner_id,
      amount,
      description
    );
    console.log(response);
    return reply.status(200).send(response);
  } catch (error) {
    const errorMappings = {
      SameUsersError: 409,
      PerfilNotExistError: 404,
      SkinNotExistError: 404,
      InsufficientFundsError: 400,
      CannotAdvertiseSkinNotYour: 400,
      SkinHasAlreadyBeenSoldError: 409,
    };

    const status = errorMappings[error.constructor.name] || 500;
    return reply.status(status).send({ error: error.message });
  }
}
