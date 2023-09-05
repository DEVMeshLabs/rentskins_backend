import { z } from "zod";

export const createTransactionSchema = z.object({
  owner_id: z.string(),
});
