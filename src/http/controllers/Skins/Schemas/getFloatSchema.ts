import { z } from "zod";

export const getFloatSchema = z.object({
  url: z.string().url(),
});
