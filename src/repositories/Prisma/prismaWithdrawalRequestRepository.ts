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
    });
    return allTransactionsHistory;
  }
}
