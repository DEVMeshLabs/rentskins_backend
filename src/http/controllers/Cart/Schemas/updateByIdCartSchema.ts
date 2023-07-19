import { z } from "zod";

export const updateByIdCartSchema = z.object({
  buyer_name: z.string().optional(),
  buyer_id: z.string().optional(),
});
