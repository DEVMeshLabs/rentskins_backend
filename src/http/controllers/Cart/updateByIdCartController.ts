import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateByIdCartUseCase } from "@/useCases/@factories/Cart/makeUpdateByIdCartUseCase";
import { updateByIdCartSchema } from "./Schemas/updateByIdCartSchema";
import { CartNotExistError } from "@/useCases/@errors/Cart/CartNotExistError";
import { z } from "zod";

export async function updateByIdCartController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { id } = req.params as { id: string };
  const response = updateByIdCartSchema.parse(req.body);
  const price = Number(response.price);

  try {
    const makeUpdateByIdUseCase = makeUpdateByIdCartUseCase();
    await makeUpdateByIdUseCase.execute(id, { price });
  } catch (error) {
    if (error instanceof CartNotExistError) {
      return reply.status(404).send({ error: error.message });
    } else if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: "Erro de validação", errors: error.errors });
    }
    return reply.status(500).send({ error: error.message });
  }

  return reply.status(204).send();
}
