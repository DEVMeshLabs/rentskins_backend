import { z } from "zod";

export const getManyUserNotificationSchema = z.object({
  tempo: z.enum([
    "tudo",
    "hoje",
    "tresDias",
    "umaSemana",
    "umMes",
    "tresMes",
    "umAno",
  ]),
  page: z.number().default(1),
  pageSize: z.number().default(2),
});
