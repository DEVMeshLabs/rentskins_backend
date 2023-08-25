import { FastifyRequest, FastifyReply } from "fastify";
import { CartNotExistError } from "@/useCases/@errors/Cart/CartNotExistError";
import { makeDeleteCartUseCase } from "@/useCases/@factories/Cart/makeDeleteCartUseCase";

export async function deleteCartController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  const { id } = req.params as { id: string };

  try {
    const deleteCart = makeDeleteCartUseCase();
    await deleteCart.execute(id);
  } catch (error) {
    if (error instanceof CartNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
  return reply.status(204).send();
}
