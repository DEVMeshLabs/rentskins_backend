import { z } from "zod";

export const updateConfigurationSchema = z.object({
  owner_id: z.string().optional(),
  owner_email: z.string().optional(),
  owner_name: z.string().optional(),
  url_sell: z.string().optional(),
  url_trade: z.string().optional(),
  steam_guard: z.boolean().optional(),
  agreed_with_emails: z.boolean().optional(),
  agreed_with_terms: z.boolean().optional(),
});
