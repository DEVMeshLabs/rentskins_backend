import { Prisma } from "@prisma/client";
import { IRentalTransactionRepository } from "../interfaceRepository/IRentalTransactionRepository";
import { prisma } from "@/lib/prisma";

export class PrismaRentalTransactionRepository
  implements IRentalTransactionRepository
{
  async findById(id: string) {
    const findRentalTransaction = await prisma.rentalTransaction.findFirst({
      where: { id, deletedAt: null },
      include: { skinsRent: true, skinsGuarantee: true },
    });
    return findRentalTransaction;
  }

  async create(data: Prisma.RentalTransactionCreateInput) {
    const createRental = await prisma.rentalTransaction.create({ data });
    return createRental;
  }

  async findByMany() {
    const skins = await prisma.rentalTransaction.findMany({
      include: { skinsRent: true, skinsGuarantee: true },
      orderBy: { createdAt: "desc" },
    });
    return skins;
  }

  async findByManyStatus(status: any) {
    const skins = await prisma.rentalTransaction.findMany({
      where: { status },
      include: { skinsRent: true, skinsGuarantee: true },
      orderBy: { createdAt: "desc" },
    });
    return skins;
  }

  // async findByManyIds(ids: string[]) {
  //   const skin = await prisma.rentalTransaction.findMany({
  //     where: { id: { in: ids } },
  //     include: { skinsRent: true, skinsGuarantee: true },
  //   });
  //   return skin;
  // }

  async checkPendingGuarantee() {
    const now = new Date();
    const findManyRentalStatus = await prisma.rentalTransaction.findMany({
      where: {
        status: "WaitingForGuaranteeConfirmation",
        createdAt: {
          lt: new Date(now.getTime() - 20 * 60 * 1000),
        },
      },
      include: { skinsRent: true, skinsGuarantee: true },
    });
    return findManyRentalStatus;
  }

  async sendDeadlineNotification() {
    const now = new Date();
    const twelveHoursFromNow = new Date(now.getTime() + 12 * 60 * 60 * 1000);

    const transactionsToNotify = await prisma.rentalTransaction.findMany({
      where: {
        status: "TrialPeriodStarted",
        deadlineNotified: false,
        endDate: {
          gte: now, // maior ou igual a agora
          lte: twelveHoursFromNow, // menor ou igual a 12 horas a partir de agora
        },
      },
    });

    return transactionsToNotify;
  }

  async findByManyUser(steamId: string) {
    const skins = await prisma.rentalTransaction.findMany({
      where: {
        OR: [
          {
            skinsRent: {
              some: {
                seller_id: steamId,
              },
            },
          },
          {
            buyerId: steamId,
          },
        ],
      },
      include: { skinsRent: true, skinsGuarantee: true },
      orderBy: { createdAt: "desc" },
    });
    return skins;
  }

  async findByManyUserRent(steamId: string) {
    const skins = await prisma.rentalTransaction.findMany({
      where: {
        buyerId: steamId,
      },
      include: { skinsRent: true, skinsGuarantee: true },
      orderBy: { createdAt: "desc" },
    });
    return skins;
  }

  async updateStatus(
    id: string,
    status:
      | "WaitingForGuaranteeConfirmation"
      | "WaitingForAdministrators"
      | "WaitingForBuyerConfirmation"
      | "WaitingForSellerConfirmation"
      | "TrialPeriodStarted"
      | "WaitingForReturn"
      | "WaitingForUserDecision"
      | "Completed"
      | "Failed"
  ) {
    const updateStatus = prisma.rentalTransaction.update({
      where: { id },
      data: { status, updatedAt: new Date() },
    });
    return updateStatus;
  }

  async updateId(
    id: string,
    data: Prisma.RentalTransactionUncheckedUpdateInput
  ) {
    const updateId = await prisma.rentalTransaction.update({
      where: { id },
      data: { ...data },
      include: { skinsRent: true, skinsGuarantee: true },
    });
    return updateId;
  }

  async updateMany(
    ids: string[],
    data: Prisma.RentalTransactionUncheckedUpdateManyInput
  ) {
    const updateMany = await prisma.rentalTransaction.updateMany({
      where: { id: { in: ids } },
      data,
    });
    return updateMany;
  }
}
