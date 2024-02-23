import { prisma } from "@/lib/prisma";
import { ITransactionHistoryRepository } from "../interfaceRepository/ITransactionHistoryRepository";
import { Prisma } from "@prisma/client";

export class PrismaTransactionHistoryRepository
  implements ITransactionHistoryRepository
{
  async create(data: Prisma.TransactionHistoryCreateInput) {
    const createdTransaction = await prisma.transactionHistory.create({
      data,
    });
    return createdTransaction;
  }

  async findByMany(isProcess: false) {
    const allTransactionsHistory = await prisma.transactionHistory.findMany({
      where: { deletedAt: null, processTransaction: isProcess },
      orderBy: { createdAt: "desc" },
    });
    return allTransactionsHistory;
  }

  async findById(id: string) {
    const findTransaction = await prisma.transactionHistory.findFirst({
      where: { id, deletedAt: null },
    });
    return findTransaction;
  }

  async updateId(id: string, data: Prisma.TransactionHistoryUpdateInput) {
    const updateId = await prisma.transactionHistory.update({
      where: { id },
      data: { ...data },
    });

    return updateId;
  }
}
