import { z } from "zod";

export const createTransactionSchema = z.array(
  z.object({
    skin_id: z.string(),
    seller_id: z.string(),
    buyer_id: z.string(),
  })
);
