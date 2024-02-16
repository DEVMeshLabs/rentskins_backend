import { Prisma, TransactionHistory } from "@prisma/client";
import { randomUUID } from "crypto";
import { ITransactionHistoryRepository } from "../interfaceRepository/ITransactionHistoryRepository";

export class InMemoryTransactionHistoryRepository
  implements ITransactionHistoryRepository
{
  public transactionsHistory: TransactionHistory[] = [];

  private notImplemented(): Promise<any> {
    return this.notImplemented();
  }

  async create(data: Prisma.TransactionHistoryUncheckedCreateInput) {
    const transactionHistory: TransactionHistory = {
      id: data.id ?? randomUUID(),
      transaction_id: data.transaction_id,
      buyer_id: data.buyer_id,
      seller_id: data.seller_id,
      processTransaction: data.processTransaction ?? false,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    this.transactionsHistory.push(transactionHistory);
    return transactionHistory;
  }

  async findById(id: string) {
    const getTransaction = this.transactionsHistory.find((transaction) => {
      return transaction.id === id;
    });
    return getTransaction;
  }

  async findByMany() {
    return this.notImplemented();
  }
}
