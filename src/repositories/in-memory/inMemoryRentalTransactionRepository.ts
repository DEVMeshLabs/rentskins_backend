import { Prisma, type RentalTransaction } from "@prisma/client";
import { IRentalTransactionRepository } from "../interfaceRepository/IRentalTransactionRepository";
import { randomUUID } from "crypto";

export class InMemoryRentalTransactionRepository
  implements IRentalTransactionRepository
{
  public rentalTransactions = [];

  async create(
    data: Prisma.RentalTransactionCreateInput & {
      skinsRent: Prisma.JsonValue[];
      skinsGuarantee: Prisma.JsonValue[];
    }
  ) {
    const rentalTransaction = {
      id: data.id ?? randomUUID(),
      buyerId: data.buyerId,
      skinsRent: data.skinsRent ?? [],
      skinsGuarantee: data.skinsGuarantee ?? [],
      totalPriceRent: data.totalPriceRent ?? null,
      totalPriceSkins: data.totalPriceSkins ?? null,
      fee: data.fee ?? null,
      daysQuantity: data.daysQuantity,
      status: data.status ?? "WaitingForGuaranteeConfirmation",
      startDate: new Date(),
      endDate: new Date(),
      guaranteeSentAt: new Date(data.guaranteeSentAt) ?? null,
      deadlineNotified: false,
      returnNotified: false,

      createdAt: (data.createdAt as Date) ?? new Date(), // menos 10 minutos
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

  async findByMany() {
    return this.rentalTransactions;
  }

  async checkPendingGuarantee(): Promise<RentalTransaction[]> {
    // Quero pegar todas as transações que estão com status WaitingForGuarantee e que já passaram 20 minutos
    const currentDate = new Date();
    const createAtVeirfy = new Date(
      currentDate.setMinutes(currentDate.getMinutes() - 20)
    );

    const getTransactions = this.rentalTransactions.filter(
      (transaction) =>
        transaction.status === "WaitingForGuaranteeConfirmation" &&
        transaction.createdAt <= createAtVeirfy
    );
    return getTransactions;
  }

  async findByManyStatus(status: string) {
    return this.rentalTransactions.filter(
      (transaction) => transaction.status === status
    );
  }

  async findByManyUser(steamId: string) {
    return this.rentalTransactions.filter(
      (transaction) =>
        transaction.skinsRent.some((skin) => skin.seller_id === steamId) ||
        transaction.buyerId === steamId
    );
  }

  async updateStatus(
    id: string,
    status:
      | "WaitingForGuaranteeConfirmation"
      | "WaitingForSellerOffer"
      | "WaitingForSellerConfirmation"
      | "TrialPeriodStarted"
      | "WaitingForReturn"
      | "WaitingForUserDecision"
      | "Completed"
      | "Failed"
  ) {
    const index = this.rentalTransactions.findIndex(
      (transaction) => transaction.id === id
    );
    if (index !== -1) {
      this.rentalTransactions[index] = {
        ...this.rentalTransactions[index],
        status,
      };
      return this.rentalTransactions[index];
    }
    return this.rentalTransactions[index];
  }
}
