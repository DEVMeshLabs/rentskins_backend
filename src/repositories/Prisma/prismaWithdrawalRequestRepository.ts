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

  async findByUser(owner_id: string) {
    const transactionHistory = await prisma.withdrawalRequest.findFirst({
      where: { owner_id },
    });
    return transactionHistory;
  }

  async updateStatusUser(owner_id: string, status: "Approved" | "Rejected") {
    const updatedTransaction = await prisma.withdrawalRequest.updateMany({
      where: { owner_id },
      data: { status },
    });
    return updatedTransaction;
  }
}
