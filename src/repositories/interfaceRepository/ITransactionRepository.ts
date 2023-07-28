import { Prisma, Transaction } from "@prisma/client";

export interface ITransactionRepository {
  create(data: Prisma.TransactionCreateInput): Promise<Transaction>;
}
