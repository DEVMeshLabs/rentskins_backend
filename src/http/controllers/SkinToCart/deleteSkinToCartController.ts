import { SkinToCartNotExistError } from "@/useCases/@errors/SkinToCart/skinToCartNotError";
import { makeDeleteSkinToCase } from "@/useCases/@factories/SkinToCart/makeDeleteSkinToCart";
import { FastifyRequest, FastifyReply } from "fastify";

export async function deleteSkinToCartController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = req.body as { id: string };
    const deleteSkinToCase = makeDeleteSkinToCase();
    await deleteSkinToCase.execute(id);
  } catch (error) {
    if (error instanceof SkinToCartNotExistError) {
      return reply.status(404).send({ error: error.message });
    }
    throw error;
  }
  return reply.status(204).send();
}
