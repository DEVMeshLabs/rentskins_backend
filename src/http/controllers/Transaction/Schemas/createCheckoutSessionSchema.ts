import { z } from "zod";

export const createCheckoutSessionSchema = z.object({
  owner_id: z.string(),
  email: z.string().email(),
  amount: z.number().min(5),
  payment_method: z.enum(["card", "boleto", "pix"]),
  success_url: z.string(),
  cancel_url: z.string(),
  cpf: z.string(),
});
