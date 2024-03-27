import { z } from "zod";

const createRentalTransactionSchema = z.object({
  seller_id: z.string(),
  buyer_id: z.string(),
  skin_id: z.string(),
  days_quantity: z.enum(["7", "14", "21"]),
});

export default createRentalTransactionSchema;
