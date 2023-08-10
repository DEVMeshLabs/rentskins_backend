import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateByIdCartUseCase } from "@/useCases/@factories/Cart/makeUpdateByIdCartUseCase";
import { updateByIdCartSchema } from "./Schemas/updateByIdCartSchema";
import { CartNotExistError } from "@/useCases/@errors/Cart/CartNotExistError";
import { z } from "zod";

export async function updateByIdCartController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };
  const { price } = updateByIdCartSchema.parse(req.body);

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
    throw new Error();
  }

  return reply.status(204).send();
}
