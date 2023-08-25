import { SkinToCartNotExistError } from "@/useCases/@errors/SkinToCart/skinToCartNotError";
import { makeGetSkinToCart } from "@/useCases/@factories/SkinToCart/makeGetSkinToCart";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getSkinToCartController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { id } = req.params as { id: string };
    const getSkinToCart = makeGetSkinToCart();
    const response = await getSkinToCart.execute(id);

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof SkinToCartNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
}
