import { Prisma } from "@prisma/client";
import { IWalletRepository } from "../interfaceRepository/IWalletRepository";
import { prisma } from "@/lib/prisma";

export class PrismaWalletRepository implements IWalletRepository {
  async findByMany() {
    const walletAll = await prisma.wallet.findMany({
      where: { deletedAt: null },
    });
    return walletAll;
  }

  async findByUser(owner_id: string) {
    const walletIdUser = await prisma.wallet.findFirst({
      where: { owner_id, deletedAt: null },
    });
    return walletIdUser;
  }

  async findById(id: string) {
    const walletId = await prisma.wallet.findFirst({
      where: { id, deletedAt: null },
    });

    return walletId;
  }

  async updateByUserValue(owner_id: string, value: string) {
    const updateIdValue = await prisma.wallet.updateMany({
      where: { owner_id },
      data: { value, updatedAt: new Date() },
    });
    return updateIdValue;
  }

  async create(data: Prisma.WalletUncheckedCreateInput) {
    const createWallet = await prisma.wallet.create({
      data,
    });
    return createWallet;
  }

  async deleteWallet(id: string) {
    const deleteWallet = await prisma.wallet.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return deleteWallet;
  }
}
