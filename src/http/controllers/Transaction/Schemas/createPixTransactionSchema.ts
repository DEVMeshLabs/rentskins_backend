import { z } from "zod";

export const createPixTransactionSchema = z.object({
  owner_id: z.string(),
  amount: z.number().min(5).max(25000),
  email: z.string().email(),
  cpf: z.string(),
});
