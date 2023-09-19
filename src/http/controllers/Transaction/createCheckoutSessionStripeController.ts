import { FastifyRequest, FastifyReply } from "fastify";
import { createTransactionSchema } from "./Schemas/createTransactionSchema";
import { ZodError } from "zod";
import { makeCreateCheckoutSessionStripe } from "@/useCases/@factories/Transaction/makeCreateCheckoutSessionStripe";

export async function createCheckoutSessionStripeController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { owner_id, cancel_url, success_url, amount, payment_method, email } =
      createTransactionSchema.parse(req.body);
    const makeTransaction = makeCreateCheckoutSessionStripe();

    const response = await makeTransaction.process({
      owner_id,
      payment_method,
      amount,
      email,
      cancel_url,
      success_url,
    });

    return reply.status(200).send({ url: response });
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.message });
    }
    throw error;
  }
}