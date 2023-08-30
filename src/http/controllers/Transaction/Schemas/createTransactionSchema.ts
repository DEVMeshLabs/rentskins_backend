import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z.enum(["5", "10", "25", "50", "100", "200", "500", "1000"]),
});
