import { z } from "zod";

export const createPerfilInfoSchema = z.object({
  owner_id: z.string(),
  steam_level: z.string(),
  status_member: z.string().optional(),
  delivery_time: z.string().optional(),
  delivery_fee: z.string().optional(),
  total_exchanges: z.string().optional(),
  account_date: z.string().optional(),
});
