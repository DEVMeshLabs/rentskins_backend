import { makeCreateUseCase } from "@/useCases/@factories/Skin/makeCreateSkinUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import createSkinSchema from "./Schemas/createSkinSchema";
import { SkinAlreadyExistsError } from "@/useCases/@errors/Skin/SkinAlreadyExistsError";
import { ZodError } from "zod";
import { KeySteamNotFoundError } from "@/useCases/@errors/TransactionHistory/KeySteamNotFoundError";

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
        skin_market_hash_name,
        skin_category,
        skin_weapon,
        skin_price,
        skin_float,
        skin_paintseed,
        skin_classid,
        skin_instanceid,
        skin_rarity,
        skin_link_game,
        skin_link_steam,
        seller_name,
        seller_id,
        asset_id,
        status_float,
        sale_type,
        pricesafe7d,
        borderColor,
        color,
        slug,
        stickers,
      }) =>
        await skinRepository.execute({
          skin_image,
          skin_name,
          skin_market_hash_name,
          skin_category,
          skin_weapon,
          skin_price,
          skin_float,
          skin_paintseed,
          skin_rarity,
          skin_link_game,
          skin_link_steam,
          seller_name,
          seller_id,
          status_float,
          sale_type,
          asset_id,
          stickers,
          pricesafe7d,
          borderColor,
          color,
          slug,
          skin_classid,
          skin_instanceid,
        })
    );

    await Promise.all([...response]);
  } catch (error) {
    if (error instanceof SkinAlreadyExistsError) {
      return reply
        .status(409)
        .send({ error: error.message, asset_id: error.asset_id });
    } else if (error instanceof KeySteamNotFoundError) {
      return reply.status(400).send({ error: error.message });
    } else if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.message });
    }
    return reply.status(500).send({ error: error.message });
  }

  return reply.status(201).send();
}
