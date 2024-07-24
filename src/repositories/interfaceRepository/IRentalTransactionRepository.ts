import { Prisma, RentalTransaction } from "@prisma/client";

export interface IRentalTransactionRepository {
  create(data: Prisma.RentalTransactionCreateInput): Promise<RentalTransaction>;
  findById(id: string): Promise<RentalTransaction | null>;

  findByMany(): Promise<RentalTransaction[]>;
  findByManyUser(steamId: string): Promise<RentalTransaction[]>;
  updateId(
    id: string,
    data: Prisma.RentalTransactionUncheckedUpdateInput
  ): Promise<RentalTransaction>;
}
