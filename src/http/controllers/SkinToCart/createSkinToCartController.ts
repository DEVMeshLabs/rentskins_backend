import { SkinNotExistError } from "@/useCases/@errors/Skin/SkinNotExistsError";
import { makeCreateSkinToCart } from "@/useCases/@factories/SkinToCart/makeCreateSkinToCart";
import { FastifyRequest, FastifyReply } from "fastify";

export async function createSkinToCartController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { skinId, cartId } = req.body as { skinId: string; cartId: string };
    const createSkinToCart = makeCreateSkinToCart();
    await createSkinToCart.execute({ skinId, cartId });
  } catch (error) {
    if (error instanceof SkinNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}
