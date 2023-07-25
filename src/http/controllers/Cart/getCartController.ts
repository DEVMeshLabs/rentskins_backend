import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetCartUseCase } from "@/useCases/factories/Cart/makeGetCartUseCase";
import { CartNotExistError } from "@/useCases/errors/Cart/CartNotExistError";

export async function getCartController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    const makeGet = makeGetCartUseCase();
    const getCart = await makeGet.execute(id);
    return reply.status(200).send(getCart);
  } catch (error) {
    if (error instanceof CartNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw new Error();
  }
}
