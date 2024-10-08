import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import type { IWithdrawalRequestRepository } from "../interfaceRepository/IWithdrawalRequestRepository";

export class PrismaWithdrawalRequestRepository
  implements IWithdrawalRequestRepository
{
  async create(data: Prisma.WithdrawalRequestCreateInput) {
    const createdTransaction = await prisma.withdrawalRequest.create({
      data,
    });
    return createdTransaction;
  }

  async findByMany() {
    const allTransactionsHistory = await prisma.withdrawalRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        wallet: {
          select: {
            owner_id: true,
            value: true,
            id: true,
          },
        },
      },
    });
    return allTransactionsHistory;
  }

  async findById(id: string) {
    const transactionHistory = await prisma.withdrawalRequest.findFirst({
      where: { id },
    });
    return transactionHistory;
  }

  async findManyUser(owner_id: string) {
    const transactionHistory = await prisma.withdrawalRequest.findMany({
      where: { owner_id },
    });
    return transactionHistory;
  }

  async findByUser(owner_id: string) {
    const transactionHistory = await prisma.withdrawalRequest.findFirst({
      where: { owner_id },
    });
    return transactionHistory;
  }

  async updateStatusUser(id: string, status: "Approved" | "Rejected") {
    const updatedTransaction = await prisma.withdrawalRequest.update({
      where: { id },
      data: { status },
    });
    return updatedTransaction;
  }
}
