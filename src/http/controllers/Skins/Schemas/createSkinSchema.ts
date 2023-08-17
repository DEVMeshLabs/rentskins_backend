import { z } from "zod";

const createSkinSchema = z.array(
  z.object({
    skin_image: z.string(),
    skin_name: z.string(),
    skin_category: z.string(),
    skin_weapon: z.string(),
    skin_price: z.string(),
    skin_float: z.string(),
    skin_color: z.string(),
    skin_link_game: z.string(),
    skin_link_steam: z.string(),
    seller_name: z.string(),
    seller_id: z.string().max(17),
    buyer_name: z.string().optional(),
    buyer_id: z.string().max(17).optional(),
    status: z.string(),
    status_float: z.string(),
    sale_type: z.string(),
    cartId: z.string().optional(),
  })
);

export default createSkinSchema;
