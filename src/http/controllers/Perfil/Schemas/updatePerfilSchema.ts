import { z } from "zod";

export const updatePerfilInfoSchema = z.object({
  owner_id: z.string().optional(),
  status_member: z.string().optional(),
  delivery_time: z.string().optional(),
  delivery_fee: z.string().optional(),
  total_exchanges: z.string().optional(),
  steam_level: z.number().optional(),
});
