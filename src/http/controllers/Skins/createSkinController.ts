import { SkinAlreadyExistsError } from "@/useCases/errors/Skin/SkinAlreadyExistsError";
import { makeCreateUseCase } from "@/useCases/factories/Skin/makeCreateSkinUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import createSkinSchema from "./Schemas/createSkinSchema";
import { z } from "zod";

export async function createSkinController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
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
    } = createSkinSchema.parse(req.body);
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
    });
  } catch (error) {
    if (error instanceof SkinAlreadyExistsError) {
      return reply.status(409).send({ error: error.message });
    } else if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: "Erro de validação", errors: error.errors });
    }
    throw error;
  }
  return reply.status(201).send();
}
