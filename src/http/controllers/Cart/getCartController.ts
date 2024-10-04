import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetCartUseCase } from "@/useCases/@factories/Cart/makeGetCartUseCase";
import { CartNotExistError } from "@/useCases/@errors/Cart/CartNotExistError";

export async function getCartController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { id } = req.params as { id: string };

  try {
    const makeGetCart = makeGetCartUseCase();
    const response = await makeGetCart.execute(id);
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof CartNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
}
