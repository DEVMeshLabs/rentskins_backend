import { z } from "zod";

export const createPerfilInfoSchema = z.object({
  owner_id: z.string().max(17),
  owner_name: z.string(),
  owner_country: z.string().optional(),
  picture: z.string(),
  steam_url: z
    .string()
    .refine(
      (value) =>
        /^https:\/\/steamcommunity\.com\/profiles\/\d{17}$/.test(value),
      {
        message: "Não é um link válido da Steam.",
      }
    ),
});
