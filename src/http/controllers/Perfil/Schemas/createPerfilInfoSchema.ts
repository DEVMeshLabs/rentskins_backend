import { z } from "zod";

export const createPerfilInfoSchema = z.object({
  owner_id: z.string().max(17),
  owner_name: z.string(),
  owner_country: z.string().optional(),
  picture: z.string(),
  steam_url: z.string().url(),
  delivery_time: z.string().default("Sem informações"),
});
