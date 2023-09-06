import { makeCreateTransactionUseCase } from "@/useCases/@factories/Transaction/makeCreateTransactionUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import { createTransactionSchema } from "./Schemas/createTransactionSchema";

export async function createTransactionController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { owner_id, cancel_url, success_url } = createTransactionSchema.parse(
      req.body
    );
    const makeTransaction = makeCreateTransactionUseCase();

    const response = await makeTransaction.process({
      owner_id,
      cancel_url,
      success_url,
    });
    const url = response.url;
    return reply.redirect(url);
  } catch (error) {
    console.log(error);
  }
}
