import { z } from "zod";

export const createTransactionSchema = z.object({
  owner_id: z.string(),
  success_url: z.string(),
  cancel_url: z.string(),
});
