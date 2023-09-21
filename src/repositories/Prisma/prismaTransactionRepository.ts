import { Prisma } from "@prisma/client";
import { ITransactionRepository } from "../interfaceRepository/ITransactionRepository";
import { prisma } from "@/lib/prisma";

export class PrismaTransactionRepository implements ITransactionRepository {
  async create(data: Prisma.TransactionCreateInput) {
    const create = await prisma.transaction.create({
      data,
    });
    return create;
  }

  async findByMany() {
    const transactionAll = await prisma.transaction.findMany({
      where: { deletedAt: null },
    });
    return transactionAll;
  }

  async findById(id: string) {
    const findTransaction = await prisma.transaction.findFirst({
      where: { id, deletedAt: null },
    });
    return findTransaction;
  }

  async findByUser(id: string, query?: string) {
    const userTransaction = await prisma.transaction.findFirst({
      where:
        query === "buyer"
          ? { buyer_id: id, deletedAt: null }
          : { seller_id: id, deletedAt: null },
      include: { skin: true },
    });
    return userTransaction;
  }

  async findBySkinTransaction(skin_id: string) {
    const userTransaction = await prisma.transaction.findFirst({
      where: { skin_id },
    });
    return userTransaction;
  }

  async lastSalesUser(seller_id: string) {
    const lastSales = await prisma.transaction.findMany({
      where: {
        seller_id,
        buyer_confirm: "Aceito",
        seller_confirm: "Aceito",
        salesAt: {
          not: {
            equals: null,
          },
        },
      },
      orderBy: {
        salesAt: "desc",
      },
    });
    return lastSales;
  }

  async transactionCountAll(seller_id: string) {
    const count = await prisma.transaction.count({
      where: {
        seller_id,
      },
    });
    return count;
  }

  async updateConfirm(id: string, status: string, query: string) {
    const confirmField = query === "buyer" ? "buyer_confirm" : "seller_confirm";
    const transactionAll = await prisma.transaction.update({
      where: { id },
      data: { [confirmField]: status, updatedAt: new Date() },
    });
    return transactionAll;
  }

  // async updateStatus(id: string, status: string) {
  //   const transactionAll = await prisma.transaction.update({
  //     where: { id },
  //     data: { status, updatedAt: new Date() },
  //   });
  //   return transactionAll;
  // }

  async updateId(id: string, data: Prisma.TransactionUpdateInput) {
    const updateId = await prisma.transaction.update({
      where: { id },
      data: { ...data },
    });
    return updateId;
  }
}
