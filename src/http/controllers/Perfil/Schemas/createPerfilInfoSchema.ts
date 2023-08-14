import { z } from "zod";

export const createPerfilInfoSchema = z.object({
  owner_id: z.string(),
  owner_name: z.string(),
  picture: z.string(),
  owner_country: z.string(),
  steam_url: z.string().url(),
});
