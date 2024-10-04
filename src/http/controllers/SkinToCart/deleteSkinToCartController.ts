import { SkinToCartNotExistError } from "@/useCases/@errors/SkinToCart/skinToCartNotError";
import { makeDeleteSkinToCase } from "@/useCases/@factories/SkinToCart/makeDeleteSkinToCart";
import { FastifyRequest, FastifyReply } from "fastify";

export async function deleteSkinToCartController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };
    const deleteSkinToCase = makeDeleteSkinToCase();
    await deleteSkinToCase.execute(id);
  } catch (error) {
    if (error instanceof SkinToCartNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
  return reply.status(204).send();
}
