import { Prisma } from "@prisma/client";
import { IWalletRepository } from "../interface/IWalletRepository";
import { prisma } from "@/lib/prisma";

export class PrismaWalletRepository implements IWalletRepository {
  async findByMany() {
    const walletAll = await prisma.wallet.findMany({
      where: { deletedAt: null },
    });
    return walletAll;
  }

  async findById(id: string) {
    const walletId = await prisma.wallet.findFirst({
      where: { id, deletedAt: null },
    });

    return walletId;
  }

  async create(data: Prisma.WalletUncheckedCreateInput) {
    const createWallet = await prisma.wallet.create({
      data,
    });
    return createWallet;
  }
}
