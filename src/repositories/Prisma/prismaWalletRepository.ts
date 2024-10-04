import { Prisma } from "@prisma/client";
import { IWalletRepository } from "../interfaceRepository/IWalletRepository";
import { prisma } from "@/lib/prisma";

export class PrismaWalletRepository implements IWalletRepository {
  async findByWalletsId(id: string, other_id: string): Promise<any> {
    const response = await prisma.wallet.findMany({
      where: {
        id: {
          in: [id, other_id],
        },
      },
    });
    return response;
  }

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

  async updateByUser(
    owner_id: string,
    date: Prisma.WalletUncheckedUpdateInput
  ) {
    const updateId = await prisma.wallet.update({
      where: { owner_id },
      data: { ...date, updatedAt: new Date() },
    });
    return updateId;
  }

  async updateByUserValue(owner_id: string, type: string, value: number) {
    const updateIdValue = await prisma.wallet.update({
      where: { owner_id },
      data: {
        value: { [type === "increment" ? "increment" : "decrement"]: value },
        updatedAt: new Date(),
      },
    });
    return updateIdValue;
  }

  async updateWalletsUsers(
    id: string,
    other_id: string,
    value: number
  ): Promise<any> {
    const response = Promise.all([
      await prisma.wallet.updateMany({
        where: { id },
        data: { value: { decrement: value }, updatedAt: new Date() },
      }),
      await prisma.wallet.updateMany({
        where: { id: other_id },
        data: { value: { increment: value }, updatedAt: new Date() },
      }),
    ]);

    return response;
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
