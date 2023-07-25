import { z } from "zod";

export const createCartSchema = z.object({
  buyer_name: z.string(),
  buyer_id: z.string(),
  price: z.string(),
});
