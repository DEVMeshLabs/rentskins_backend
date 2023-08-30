import { makeCreateUseCase } from "@/useCases/@factories/Skin/makeCreateSkinUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import createSkinSchema from "./Schemas/createSkinSchema";
import { z } from "zod";

export async function createSkinController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void> {
  try {
    const skins = createSkinSchema.parse(req.body);
    const skinRepository = makeCreateUseCase();
    skins.map(
      async ({
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
        asset_id,
        buyer_name,
        buyer_id,
        status,
        status_float,
        sale_type,
      }) => {
        await skinRepository.execute({
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
          asset_id,
        });
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: "Erro de validação", errors: error.errors });
    }
    throw error;
  }
  return reply.status(201).send();
}
