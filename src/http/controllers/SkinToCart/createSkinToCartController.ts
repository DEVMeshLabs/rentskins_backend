import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateSkinToCart } from "@/useCases/@factories/SkinToCart/makeCreateSkinToCart";

export async function createSkinToCartController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { skinId, cartId } = req.body as { skinId: string; cartId: string };
    const createSkinToCart = makeCreateSkinToCart();
    await createSkinToCart.execute({ skinId, cartId });
  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
  return reply.status(201).send();
}
