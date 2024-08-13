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

  async checkPendingGuarantee() {
    const findManyRentalStatus = await prisma.rentalTransaction.findMany({
      where: {
        status: "WaitingForGuaranteeConfirmation",
        createdAt: {
          lt: new Date(new Date().getTime() - 20 * 60 * 10000), // há mais de 20 minutos
        },
      },
      include: { skinsRent: true, skinsGuarantee: true },
    });
    return findManyRentalStatus;
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

  async updateStatus(
    id: string,
    status:
      | "WaitingForGuaranteeConfirmation"
      | "WaitingForAdministrators"
      | "WaitingForSellerOffer"
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
}
