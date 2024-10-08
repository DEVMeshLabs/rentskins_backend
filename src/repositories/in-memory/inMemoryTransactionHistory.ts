import { Prisma, TransactionHistory } from "@prisma/client";
import { randomUUID } from "crypto";
import { ITransactionHistoryRepository } from "../interfaceRepository/ITransactionHistoryRepository";

export class InMemoryTransactionHistoryRepository
  implements ITransactionHistoryRepository
{
  findByTrasactionId(
    transactionId: string
  ): Promise<TransactionHistory | null> {
    throw new Error("Method not implemented.");
  }

  public transactionsHistory: TransactionHistory[] = [];

  private notImplemented(): Promise<any> {
    return this.notImplemented();
  }

  async create(data: Prisma.TransactionHistoryUncheckedCreateInput) {
    const transactionHistory: any = {
      id: data.id ?? randomUUID(),
      transaction_id: data.transaction_id ?? null,
      buyer_id: data.buyer_id,
      seller_id: data.seller_id,
      processTransaction: data.processTransaction ?? "Pending",
      skins: data.skins ?? [],
      dateProcess: new Date(data.dateProcess),
      rentalTransaction_id: data.rentalTransaction_id ?? null,
      rental: data.rental ?? false,
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

  async findByMany(isProcess: string) {
    const getTransaction = this.transactionsHistory.filter((transaction) => {
      return transaction.processTransaction === isProcess;
    });
    return getTransaction;
  }

  async updateId(id: string, data: any) {
    const index = this.transactionsHistory.findIndex(
      (transaction) => transaction.id === id
    );

    if (index !== -1) {
      this.transactionsHistory[index] = {
        ...this.transactionsHistory[index],
        ...data,
      };
      return this.transactionsHistory[index];
    }

    return this.transactionsHistory[index];
  }
}
