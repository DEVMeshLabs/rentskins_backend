import { FastifyRequest, FastifyReply } from "fastify";
import { SkinToCartNotExistError } from "@/useCases/@errors/SkinToCart/skinToCartNotError";
import { makeDeleteSkinToCase } from "@/useCases/@factories/SkinToCart/makeDeleteSkinToCart";

export async function deleteSkinToCartController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = req.params as { id: string };
    const getSkinToCart = makeDeleteSkinToCase();
    await getSkinToCart.execute(id);
  } catch (error) {
    if (error instanceof SkinToCartNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
  return reply.status(200).send();
}
