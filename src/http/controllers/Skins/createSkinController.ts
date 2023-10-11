import { makeCreateUseCase } from "@/useCases/@factories/Skin/makeCreateSkinUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import createSkinSchema from "./Schemas/createSkinSchema";
import { SkinAlreadyExistsError } from "@/useCases/@errors/Skin/SkinAlreadyExistsError";
import { ZodError } from "zod";

export async function createSkinController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const skins = createSkinSchema.parse(req.body);
    const skinRepository = makeCreateUseCase();

    const response = skins.map(
      async ({
        skin_image,
        skin_name,
        skin_category,
        skin_weapon,
        skin_price,
        skin_float,
        skin_rarity,
        skin_link_game,
        skin_link_steam,
        median_price,
        seller_name,
        seller_id,
        asset_id,
        status_float,
        sale_type,
      }) =>
        await skinRepository.execute({
          skin_image,
          skin_name,
          skin_category,
          skin_weapon,
          skin_price,
          skin_float,
          skin_rarity,
          median_price,
          skin_link_game,
          skin_link_steam,
          seller_name,
          seller_id,
          status_float,
          sale_type,
          asset_id,
        })
    );

    await Promise.all([...response]);
  } catch (error) {
    if (error instanceof SkinAlreadyExistsError) {
      return reply.status(409).send({ error: error.message });
    } else if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }

  return reply.status(201).send();
}
