import { z } from "zod";

export const paginationSkinsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).default(20),
  type: z.enum(["sale", "rent"]).optional(),
  deletedAt: z.string().default("false"),
});
