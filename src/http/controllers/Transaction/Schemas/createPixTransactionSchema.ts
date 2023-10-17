import { z } from "zod";

export const createPixTransactionSchema = z.object({
  owner_id: z.string(),
  amount: z.number(),
  email: z.string().email(),
  cpf: z.string(),
});
