import { z } from "zod";

export const createNotificationSchema = z.object({
  owner_id: z.string(),
  description: z.string(),
  type: z.enum(["Input", "Output"]).optional(),
  skin_id: z.string().optional(),
});
