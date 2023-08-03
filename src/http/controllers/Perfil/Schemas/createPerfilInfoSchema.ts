import { z } from "zod";

export const createPerfilInfoSchema = z.object({
  owner_id: z.string(),
  steam_level: z.string(),
});
