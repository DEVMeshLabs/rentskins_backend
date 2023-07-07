import { Prisma } from ".prisma/client";
import { prisma } from "@/lib/prisma";
import { ISkinsRepository } from "../interface/ISkinsRepository";

export class PrismaSkinRepository implements ISkinsRepository {
  async findBySeller(seller_id: string) {
    const findSeller = await prisma.skin.findUnique({
      where: { seller_id },
    });
    return findSeller;
  }

  async findByMany() {
    const skinAll = await prisma.skin.findMany({
      where: { deletedAt: null },
    });
    return skinAll;
  }

  async findById(id: string) {
    const skinId = await prisma.skin.findUnique({
      where: { id },
    });

    return skinId;
  }

  async create(data: Prisma.SkinCreateInput) {
    const skin = await prisma.skin.create({
      data,
    });
    return skin;
  }
}
