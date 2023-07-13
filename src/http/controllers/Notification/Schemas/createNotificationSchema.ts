import { z } from "zod";

export const createNotificationSchema = z.object({
  owner_name: z.string(),
  owner_id: z.string(),
  description: z.string(),
  skin_id: z.string().optional(),
});
