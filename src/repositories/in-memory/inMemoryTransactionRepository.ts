import { Prisma } from "@prisma/client";
import { ITransactionRepository } from "../interfaceRepository/ITransactionRepository";
import { randomUUID } from "crypto";

export class inMemoryTransactionRepository implements ITransactionRepository {
  public transactions = [];
  private notImplemented(): Promise<any> {
    return this.notImplemented();
  }

  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = {
      id: data.id ?? randomUUID(),
      skin_id: data.skin_id,
      seller_id: data.seller_id,
      buyer_id: data.buyer_id,
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

  findById(id: string) {
    return this.notImplemented();
  }

  findBySkinTransaction(skin_id: string) {
    return this.notImplemented();
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
