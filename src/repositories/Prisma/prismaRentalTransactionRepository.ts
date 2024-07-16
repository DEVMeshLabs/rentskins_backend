import { Prisma } from "@prisma/client";
import { IRentalTransactionRepository } from "../interfaceRepository/IRentalTransactionRepository";
import { prisma } from "@/lib/prisma";

export class PrismaRentalTransactionRepository
  implements IRentalTransactionRepository
{
  async findBySkinRentalTransaction(skin_id: string) {
    const findSkinRentalTransaction = await prisma.rentalTransaction.findFirst({
      where: { skin_id, deletedAt: null },
    });
    return findSkinRentalTransaction;
  }

  async findById(id: string) {
    const findRentalTransaction = await prisma.rentalTransaction.findFirst({
      where: { id, deletedAt: null },
    });
    return findRentalTransaction;
  }

  async create(data: Prisma.RentalTransactionCreateInput) {
    const createRental = await prisma.rentalTransaction.create({ data });
    return createRental;
  }

  async findByMany() {
    const skins = await prisma.rentalTransaction.findMany({
      include: { skinsRent: true },
      orderBy: { createdAt: "desc" },
    });
    return skins;
  }

  async updateId(
    id: string,
    data: Prisma.RentalTransactionUncheckedUpdateInput
  ) {
    const updateId = await prisma.rentalTransaction.update({
      where: { id },
      data: { ...data },
    });
    return updateId;
  }
}
