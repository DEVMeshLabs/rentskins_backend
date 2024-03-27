import { Prisma, RentalTransaction } from "@prisma/client";

export interface IRentalTransactionRepository {
  create(data: Prisma.RentalTransactionCreateInput): Promise<RentalTransaction>;
  findById(id: string): Promise<RentalTransaction | null>;
  findBySkinRentalTransaction(
    skin_id: string
  ): Promise<RentalTransaction | null>;
  updateId(
    id: string,
    data: Prisma.RentalTransactionUncheckedUpdateInput
  ): Promise<RentalTransaction>;
}
