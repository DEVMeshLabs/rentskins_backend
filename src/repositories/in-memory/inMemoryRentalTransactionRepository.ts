import { Prisma } from "@prisma/client";
import { IRentalTransactionRepository } from "../interfaceRepository/IRentalTransactionRepository";
import { randomUUID } from "crypto";

export class InMemoryRentalTransactionRepository
  implements IRentalTransactionRepository
{
  public rentalTransactions = [];

  async create(
    data: Prisma.RentalTransactionCreateInput & { skins: Prisma.JsonValue[] }
  ) {
    const rentalTransaction = {
      id: data.id ?? randomUUID(),
      sellerId: data.sellerId,
      buyerId: data.buyerId,
      skins: data.skins ?? [],
      totalPriceRent: data.totalPriceRent ?? null,
      totalGuarantee: data.totalGuarantee ?? null,
      remainder: data.remainder ?? null,
      feePrice: data.feePrice ?? null,
      daysQuantity: data.daysQuantity,
      status: data.status ?? "Default",
      startDate: new Date(data.startDate) ?? null,
      endDate: new Date(data.endDate) ?? null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    this.rentalTransactions.push(rentalTransaction);
    return rentalTransaction;
  }

  async findById(id: string) {
    const getTransaction = this.rentalTransactions.find((transaction) => {
      return transaction.id === id && transaction.deletedAt === null;
    });
    return getTransaction;
  }

  async findBySkinRentalTransaction(skin_id: string) {
    const getTransaction = this.rentalTransactions.find((transaction) => {
      return transaction.skin_id === skin_id && transaction.deletedAt === null;
    });
    return getTransaction;
  }

  async updateId(id: string, data: any) {
    const index = this.rentalTransactions.findIndex(
      (transaction) => transaction.id === id
    );

    if (index !== -1) {
      this.rentalTransactions[index] = {
        ...this.rentalTransactions[index],
        ...data,
      };
      return this.rentalTransactions[index];
    }

    return this.rentalTransactions[index];
  }
}
