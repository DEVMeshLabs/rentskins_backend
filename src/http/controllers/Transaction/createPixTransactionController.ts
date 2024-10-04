import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreatePixTransactionUseCase } from "@/useCases/@factories/Transaction/makeCreatePixTransactionUseCase";
import { createPixTransactionSchema } from "./Schemas/createPixTransactionSchema";

export async function createPixTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { owner_id, amount, cpf, email } = createPixTransactionSchema.parse(
      req.body
    );

    const makeCreatePixTransactions = makeCreatePixTransactionUseCase();

    const response = await makeCreatePixTransactions.execute(
      owner_id,
      amount,
      cpf,
      email
    );
    return reply.status(200).send(response);
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
}
