import { SkinAlreadyExistsError } from "@/useCases/errors/Skin/SkinAlreadyExistsError";
import { makeCreateUseCase } from "@/useCases/factories/Skin/makeCreateSkinUseCase";
import { FastifyRequest, FastifyReply } from "fastify";

export async function createSkinController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const {
    skin_image,
    skin_name,
    skin_category,
    skin_weapon,
    skin_price,
    skin_float,
    skin_color,
    skin_link_game,
    skin_link_steam,
    seller_name,
    seller_id,
    buyer_name,
    buyer_id,
    status,
    status_float,
    sale_type,
    cartId,
  }: any = req.body;

  try {
    const createUseCase = makeCreateUseCase();
    await createUseCase.execute({
      skin_image,
      skin_name,
      skin_category,
      skin_weapon,
      skin_price,
      skin_float,
      skin_color,
      skin_link_game,
      skin_link_steam,
      seller_name,
      seller_id,
      buyer_name,
      buyer_id,
      status,
      status_float,
      sale_type,
      cartId,
    });
  } catch (error) {
    if (error instanceof SkinAlreadyExistsError) {
      return reply.status(409).send({ error: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}
