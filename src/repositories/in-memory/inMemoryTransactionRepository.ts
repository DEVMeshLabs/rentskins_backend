import { Prisma, Transaction } from "@prisma/client";
import { ITransactionRepository } from "../interfaceRepository/ITransactionRepository";
import { randomUUID } from "crypto";

export class InMemoryTransactionRepository implements ITransactionRepository {
  public transactions: Transaction[] = [];
  private notImplemented(): Promise<any> {
    return this.notImplemented();
  }

  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = {
      id: data.id ?? randomUUID(),
      skin_id: data.skin_id,
      seller_id: data.seller_id,
      buyer_id: data.buyer_id,
      seller_confirm: "Pending",
      buyer_confirm: "Pending",
      balance: data.balance,
      status: "Em andamento",
      salesAt: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    this.transactions.push(transaction);
    return transaction;
  }

  findByMany() {
    return this.notImplemented();
  }

  findByUser(id: string, query?: string) {
    return this.notImplemented();
  }

  async findById(id: string) {
    const getTransaction = this.transactions.find((transaction) => {
      return transaction.id === id;
    });

    return getTransaction;
  }

  async findBySkinTransaction(skin_id: string) {
    const getSkinTransaction = this.transactions.find(
      (item) => item.skin_id === skin_id
    );
    return getSkinTransaction;
  }

  transactionCountAll(seller_id: string): Promise<number> {
    return this.notImplemented();
  }

  findByManyUser(seller_id: string) {
    return this.notImplemented();
  }

  lastSalesUser(seller_id: string) {
    return this.notImplemented();
  }

  updateConfirm(id: string, status: string, query: string) {
    return this.notImplemented();
  }

  updateId(id: string, data: Prisma.TransactionUncheckedUpdateInput) {
    return this.notImplemented();
  }
}
