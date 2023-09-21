import { Prisma, Transaction } from "@prisma/client";

export interface ITransactionRepository {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>;
  findByMany(): Promise<Transaction[]>;
  findByUser(id: string, query?: string): Promise<Transaction | null>;
  findById(id: string): Promise<Transaction | null>;
  findBySkinTransaction(skin_id: string): Promise<Transaction | null>;
  transactionCountAll(seller_id: string): Promise<number>;
  lastSalesUser(seller_id: string): Promise<Transaction[]>;
  updateConfirm(
    id: string,
    status: string,
    query: string
  ): Promise<Transaction>;
  updateId(
    id: string,
    data: Prisma.TransactionUncheckedUpdateInput
  ): Promise<Transaction>;
}
