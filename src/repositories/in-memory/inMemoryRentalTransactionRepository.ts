import { Prisma } from "@prisma/client";
import { IRentalTransactionRepository } from "../interfaceRepository/IRentalTransactionRepository";
import { randomUUID } from "crypto";

export class InMemoryRentalTransactionRepository
  implements IRentalTransactionRepository
{
  public rentalTransactions = [];

  async create(data: Prisma.RentalTransactionCreateInput) {
    const rentalTransaction = {
      id: data.id ?? randomUUID(),
      owner_id: data.owner_id,
      skin_id: data.skin_id,
      total_price: data.total_price ?? null,
      fee: data.fee ?? null,
      fee_total_price: data.fee_total_price ?? null,
      seller_total_price: data.seller_total_price ?? null,
      commission_rent: data.commission_rent ?? null,
      days_quantity: data.days_quantity,
      status: data.status ?? "Em andamento",
      start_date: new Date(data.start_date) ?? null,
      end_date: new Date(data.end_date) ?? null,
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
