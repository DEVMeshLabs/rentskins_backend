import { z } from "zod";

const skinsGuaranteeSchema = z.object({
  owner_id: z.string(),
  asset_id: z.string(),
  skin_name: z.string(),
  skin_color: z.string(),
  skin_wear: z.string().nullable().optional(),
  skin_image: z.string(),
  skin_weapon: z.string(),
  skin_market_hash_name: z.string(),
  skin_paintseed: z.number().nullable().optional(),
  skin_instanceid: z.string(),
  skin_classid: z.string(),
  skin_float: z.string().nullable().optional(),
  skin_rarity: z.string(),
  skin_stickers: z
    .array(
      z.object({
        name: z.string(),
        url: z.string(),
      })
    )
    .optional(),
  skin_link_game: z.string().nullable().optional(),
  skin_link_steam: z.string().nullable().optional(),
});

const createRentalTransactionSchema = z.object({
  buyerId: z.string(),
  skinsRent: z.any(),
  skinsGuarantee: z.array(skinsGuaranteeSchema),
  daysQuantity: z.enum(["10", "20", "30"]),
  totalPriceRent: z.number(),
  totalPriceSkins: z.number(),
  fee: z.number(),
});

export { createRentalTransactionSchema, skinsGuaranteeSchema };
