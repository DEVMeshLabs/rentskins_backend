import { z } from "zod";

// const skinSchema = z.object({
//   id: z.string(),
//   skin_image: z.string(),
//   skin_name: z.string(),
//   skin_market_hash_name: z.string(),
//   skin_category: z.string(),
//   skin_weapon: z.string(),
//   skin_price: z.number().min(10),
//   skin_float: z.string(),
//   skin_paintseed: z.number(),
//   skin_classid: z.string(),
//   skin_instanceid: z.string(),
//   skin_rarity: z.string(),
//   skin_link_game: z.string(),
//   skin_link_steam: z.string(),
//   asset_id: z.string(),
//   seller_name: z.string(),
//   seller_id: z.string().max(17),
//   status: z.string().optional(),
//   slug: z.string(),
//   pricesafe7d: z.number(),
//   borderColor: z.string(),
//   color: z.string(),
//   status_float: z.string(),
//   sale_type: z.array(z.string()),
//   stickers: z
//     .array(
//       z.object({
//         name: z.string(),
//         url: z.string(),
//       })
//     )
//     .optional(),
//   cartId: z.string().optional(),
// });

const createRentalTransactionSchema = z.object({
  buyerId: z.string(),
  skinsRent: z.any(),
  skinsGuarantee: z.any(),
  daysQuantity: z.enum(["10", "20", "30"]),
  totalPriceRent: z.number(),
  totalPriceSkins: z.number(),
  fee: z.number(),
});

export default createRentalTransactionSchema;
