import { FastifyRequest, FastifyReply } from "fastify";
import { createCartSchema } from "./Schemas/createCartSchema";
import { makeCreateCartUseCase } from "@/useCases/@factories/Cart/makeCreateCartUseCase";
import { z } from "zod";
import { CartAlreadyExistError } from "@/useCases/@errors/Cart/CartAlreadyExistError";

export async function createCartController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { buyer_id, buyer_name, price, seller_id, seller_name } =
      createCartSchema.parse(req.body);
    const makeCreate = makeCreateCartUseCase();
    await makeCreate.execute({
      buyer_id,
      buyer_name,
      seller_id,
      seller_name,
      price,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Erro de validação",
        errors: error.errors,
      });
    }
    if (error instanceof CartAlreadyExistError) {
      return reply.status(409).send({ error: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}
