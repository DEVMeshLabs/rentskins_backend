import { Prisma } from ".prisma/client";
import { prisma } from "@/lib/prisma";
import { ISkinsRepository } from "../interfaceRepository/ISkinsRepository";

export class PrismaSkinRepository implements ISkinsRepository {
  async findHistoricId(seller_id: string) {
    const findHistoricId = await prisma.skin.findMany({
      where: { seller_id, sellerAt: { not: null } },
      select: {
        seller_id: true,
        seller_name: true,
        buyer_id: true,
        buyer_name: true,
        sellerAt: true,
        skin_price: true,
      },
    });

    return findHistoricId;
  }

  async create(data: Prisma.SkinCreateManyInput) {
    const skin = await prisma.skin.createMany({
      data,
    });
    return skin;
  }

  async findByManySeller(seller_id: string) {
    const findSeller = prisma.skin.findMany({
      where: { seller_id, deletedAt: null },
    });
    return findSeller;
  }

  async findByName(name: string) {
    const findName = await prisma.skin.findMany({
      where: {
        OR: [
          { skin_name: { contains: name, mode: "insensitive" } },
          { skin_category: { contains: name, mode: "insensitive" } },
          { skin_weapon: { contains: name, mode: "insensitive" } },
        ],
      },
    });
    return findName;
  }

  async findByManyCategory(skin_category: string) {
    const findManyCategory = await prisma.skin.findMany({
      where: { skin_category, deletedAt: null },
    });

    return findManyCategory;
  }

  async findByManyWeapon(skin_weapon: string) {
    const findWeapon = await prisma.skin.findMany({
      where: { skin_weapon, deletedAt: null },
    });

    return findWeapon;
  }

  async findBySeller(seller_id: string) {
    const findSeller = await prisma.skin.findFirst({
      where: { seller_id, deletedAt: null },
    });
    return findSeller;
  }

  async findByMany(page: number) {
    const skinAll = await prisma.skin.findMany({
      where: { deletedAt: null },
      take: 5,
      skip: (page - 1) * 5,
      include: { Notification: true },
    });
    return skinAll;
  }

  async updateById(id: string, data: Prisma.SkinUpdateInput) {
    const updateId = await prisma.skin.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
    return updateId;
  }

  async findById(id: string) {
    const skinId = await prisma.skin.findFirst({
      where: { id, deletedAt: null },
    });

    return skinId;
  }

  async deleteSkin(id: string) {
    const deleteSkin = await prisma.skin.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return deleteSkin;
  }
}
