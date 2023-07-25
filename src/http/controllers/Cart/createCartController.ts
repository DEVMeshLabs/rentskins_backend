import { FastifyRequest, FastifyReply } from "fastify";
import { createCartSchema } from "./Schemas/createCartSchema";
import { makeCreateCartUseCase } from "@/useCases/factories/Cart/makeCreateCartUseCase";
import { z } from "zod";

export async function createCartController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { buyer_id, buyer_name, price } = createCartSchema.parse(req.body);
    const makeCreate = makeCreateCartUseCase();
    await makeCreate.execute({ buyer_id, buyer_name, price });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Erro de validação",
        errors: error.errors,
      });
    }
    throw error;
  }
  return reply.status(201).send();
}
