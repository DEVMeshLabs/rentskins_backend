import { prisma } from "@/lib/prisma";
import { Prisma, type GuaranteeSkin } from "@prisma/client";
import type { ISkinGuaranteeRepository } from "../interfaceRepository/ISkinGuarantee";

export class PrismaSkinGuaranteeRepository implements ISkinGuaranteeRepository {
  async updateById(
    id: string,
    date: Prisma.GuaranteeSkinUncheckedUpdateManyInput
  ): Promise<any> {
    const updateId = await prisma.guaranteeSkin.update({
      where: { id },
      data: { ...date, updatedAt: new Date() },
    });
    return updateId;
  }

  async findById(id: string): Promise<GuaranteeSkin | null> {
    const skin = await prisma.guaranteeSkin.findUnique({
      where: { id },
    });
    return skin;
  }

  async findByAssets(assetIds: string[]): Promise<GuaranteeSkin[]> {
    const skins = await prisma.guaranteeSkin.findMany({
      where: { asset_id: { in: assetIds } },
      include: { rentalTransactions: true },
    });
    return skins;
  }

  async findManySend(): Promise<GuaranteeSkin[]> {
    const skins = await prisma.guaranteeSkin.findMany({
      where: {
        addedToBackpackAt: {
          not: null,
        },
      },
    });
    return skins;
  }

  async checkSkinGuaranteeLocaterioinTransaction(
    locatarioId: string
  ): Promise<any> {
    const skins = await prisma.guaranteeSkin.findMany({
      where: {
        owner_id: locatarioId,
        isSolicited: false,
        returnedAt: null,
      },
      include: {
        rentalTransactions: {
          where: {
            status: {
              notIn: ["Failed", "Completed"],
            },
            returnDueAt: null,
          },
        },
      },
    });
    return skins;
  }
}
