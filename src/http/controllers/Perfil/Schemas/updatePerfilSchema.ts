import { z } from "zod";

export const updatePerfilInfoSchema = z.object({
  owner_id: z.string().optional(),
  status_member: z.string().optional(),
  delivery_time: z.string().optional(),
  delivery_fee: z.number().optional(),
  total_exchanges: z.string().optional(),
  steam_level: z.number().optional(),
  owner_type: z.enum(["Usuario", "Administrador"]).optional(),
});
