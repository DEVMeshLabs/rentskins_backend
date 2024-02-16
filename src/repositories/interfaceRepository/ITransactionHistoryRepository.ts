import { Prisma, TransactionHistory } from "@prisma/client";

export interface ITransactionHistoryRepository {
  create(
    data: Prisma.TransactionHistoryUncheckedCreateInput
  ): Promise<TransactionHistory>;
  findByMany(): Promise<TransactionHistory[]>;
  findById(id: string): Promise<TransactionHistory | null>;
}
