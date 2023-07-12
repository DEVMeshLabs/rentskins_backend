import { z } from "zod";

export const createConfigurationSchema = z.object({
  owner_id: z.string(),
  owner_email: z.string(),
  owner_name: z.string(),
  url_sell: z.string(),
  url_trade: z.string(),
  steam_guard: z.boolean(),
  agreed_with_emails: z.boolean(),
  agreed_with_terms: z.boolean(),
});
