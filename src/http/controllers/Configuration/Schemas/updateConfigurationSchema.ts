import { z } from "zod";

export const updateConfigurationSchema = z.object({
  owner_id: z.string().optional(),
  owner_email: z.string().email().optional(),
  owner_name: z.string().min(3).optional(),
  owner_phone: z.string().optional(),
  owner_cpf: z.string().optional(),
  url_sell: z.string().optional(),
  url_trade: z
    .string()
    .refine((value) => /^https:\/\/steamcommunity\.com\//.test(value), {
      message: "Não é um link válido da Steam.",
    })
    .optional(),
  agreed_with_emails: z.boolean().optional(),
  agreed_with_terms: z.boolean().optional(),
});
