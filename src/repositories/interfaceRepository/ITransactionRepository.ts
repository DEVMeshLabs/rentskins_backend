import { Prisma, Transaction } from "@prisma/client";

export interface ITransactionRepository {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>;
  findByMany(): Promise<Transaction[]>;
  findByUser(id: string, type: string): Promise<Transaction | null>;
  findById(id: string): Promise<Transaction | null>;
  updateConfirm(
    id: string,
    status: string,
    query: string
  ): Promise<Transaction>;
}
