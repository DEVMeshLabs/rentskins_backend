import { z } from "zod";

export const updatePerfilInfoSchema = z.object({
  owner_id: z.string().optional(),
  owner_country: z.string().optional(),
  owner_type: z.enum(["Usuario", "Administrador"]).optional(),
  owner_name: z.string().optional(),
  status_member: z.string().optional(),
  delivery_time: z.string().optional(),
  delivery_fee: z.number().optional(),
  total_exchanges: z.number().optional(),
  steam_url: z.string().optional(),
  account_status: z.enum(["Ativo", "Suspenso"]).optional(),
  configurationId: z.string().optional(),
  picture: z.string().optional(),
});
