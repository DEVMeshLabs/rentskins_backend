import { z } from "zod";

const createRentalTransactionSchema = z.object({
  sellerId: z.string(),
  buyerId: z.string(),
  skins: z.array(z.object({})),
  daysQuantity: z.enum(["10", "20", "30"]),
});

export default createRentalTransactionSchema;
