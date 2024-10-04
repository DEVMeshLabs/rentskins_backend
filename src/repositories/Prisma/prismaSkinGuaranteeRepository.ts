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
      include: { RentalTransaction: true },
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
}
