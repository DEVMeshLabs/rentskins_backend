import { z } from "zod";

const createRentalTransactionSchema = z.object({
  sellerId: z.string(),
  buyerId: z.string(),
  skins: z.array(z.object({})),
  daysQuantity: z.enum(["10", "20", "30"]),
  totalPriceRent: z.number(),
  totalGuarantee: z.number(),
  remainder: z.number(),
  feePrice: z.number(),
});

export default createRentalTransactionSchema;
