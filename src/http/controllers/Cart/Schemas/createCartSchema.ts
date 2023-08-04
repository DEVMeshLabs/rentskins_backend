import { z } from "zod";

export const createCartSchema = z.object({
  buyer_name: z.string(),
  buyer_id: z.string(),
  seller_id: z.string(),
  seller_name: z.string(),
  price: z.string(),
});
