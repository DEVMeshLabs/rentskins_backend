import { z } from "zod";

export const updateByIdCartSchema = z.object({
  buyer_name: z.string().optional(),
  price: z.string(),
});
