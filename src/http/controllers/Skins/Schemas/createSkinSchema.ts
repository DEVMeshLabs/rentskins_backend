import { z } from "zod";

const createSkinSchema = z.array(
  z.object({
    skin_image: z.string(),
    skin_name: z.string(),
    skin_market_hash_name: z.string(),
    skin_category: z.string(),
    skin_weapon: z.string(),
    skin_price: z.number().min(10),
    skin_float: z.string(),
    skin_paintseed: z.number(),
    skin_classid: z.string(),
    skin_instanceid: z.string(),
    skin_rarity: z.string(),
    skin_link_game: z.string(),
    skin_link_steam: z.string(),
    asset_id: z.string(),
    seller_name: z.string(),
    seller_id: z.string().max(17),
    status: z.string(),
    slug: z.string(),
    pricesafe7d: z.number(),
    borderColor: z.string(),
    color: z.string(),
    status_float: z.string(),
    sale_type: z.string(),
    stickers: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
        })
      )
      .optional(),
    cartId: z.string().optional(),
  })
);

export default createSkinSchema;
