import { z } from "zod";

export const updatePerfilInfoSchema = z.object({
  owner_country: z.string().optional(),
  owner_type: z.enum(["Usuario", "Administrador"]).optional(),
  owner_name: z.string().min(3).optional(),
  status_member: z.string().optional(),
  delivery_time: z.string().optional(),
  delivery_fee: z.number().optional(),
  total_exchanges: z.number().optional(),
  steam_url: z
    .string()
    .refine(
      (value) =>
        /^https:\/\/steamcommunity\.com\/profiles\/\d{17}$/.test(value),
      {
        message: "Não é um link válido da Steam.",
      }
    )
    .optional(),
  account_status: z.enum(["Ativo", "Suspenso"]).optional(),
  picture: z.string().optional(),
});
