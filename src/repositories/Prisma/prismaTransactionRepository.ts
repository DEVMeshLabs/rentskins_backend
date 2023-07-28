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
}
