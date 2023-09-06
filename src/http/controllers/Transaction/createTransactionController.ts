import { makeCreateTransactionUseCase } from "@/useCases/@factories/Transaction/makeCreateTransactionUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import { createTransactionSchema } from "./Schemas/createTransactionSchema";

export async function createTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { owner_id } = createTransactionSchema.parse(req.body);
    const makeTransaction = makeCreateTransactionUseCase();

    const response = await makeTransaction.process({ owner_id });
    return reply.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
}
