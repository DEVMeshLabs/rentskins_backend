import { CartNotExistError } from "@/useCases/@errors/Cart/CartNotExistError";
import { SkinAlreadyExistsError } from "@/useCases/@errors/Skin/SkinAlreadyExistsError";
import { SkinNotExistError } from "@/useCases/@errors/Skin/SkinNotExistsError";
import { makeCreateSkinToCart } from "@/useCases/@factories/SkinToCart/makeCreateSkinToCart";
import { FastifyRequest, FastifyReply } from "fastify";

export async function createSkinToCartController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const { skinId, cartId } = req.body as { skinId: string; cartId: string };
    const createSkinToCart = makeCreateSkinToCart();
    await createSkinToCart.execute({ skinId, cartId });
  } catch (error) {
    if (error instanceof SkinNotExistError) {
      return reply.status(404).send({ error: error.message });
    } else if (error instanceof CartNotExistError) {
      return reply.status(404).send({ error: error.message });
    } else if (error instanceof SkinAlreadyExistsError) {
      return reply.status(409).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }
  return reply.status(201).send();
}
