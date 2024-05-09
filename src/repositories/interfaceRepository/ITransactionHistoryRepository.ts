import { Prisma, TransactionHistory } from "@prisma/client";

export interface ITransactionHistoryRepository {
  create(
    data: Prisma.TransactionHistoryUncheckedCreateInput
  ): Promise<TransactionHistory>;
  findByMany(isProcess: string): Promise<TransactionHistory[]>;
  findById(id: string): Promise<TransactionHistory | null>;
  findByTrasactionId(historyId: string): Promise<TransactionHistory | null>;
  updateId(
    id: string,
    data: Prisma.TransactionHistoryUncheckedUpdateInput
  ): Promise<TransactionHistory>;
}
