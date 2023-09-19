import { Prisma, Transaction } from "@prisma/client";

export interface ITransactionRepository {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>;
  findByMany(): Promise<Transaction[]>;
  findByUser(id: string, type: string): Promise<Transaction | null>;
  findById(id: string): Promise<Transaction | null>;
  transactionCountAll(seller_id: string): Promise<number>;
  updateConfirm(
    id: string,
    status: string,
    query: string
  ): Promise<Transaction>;
}
