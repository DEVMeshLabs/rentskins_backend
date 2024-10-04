import { z } from "zod";

export const createConfigurationSchema = z.object({
  owner_id: z.string(),
  owner_email: z.string().email(),
  owner_name: z.string().min(3),
  owner_phone: z.string(),
  owner_cpf: z.string(),
  url_sell: z.string(),
  url_trade: z
    .string()
    .refine((value) => /^https:\/\/steamcommunity\.com\//.test(value), {
      message: "Não é um link válido da Steam.",
    }),
  steam_guard: z.boolean(),
  agreed_with_emails: z.boolean(),
  agreed_with_terms: z.boolean(),
});
