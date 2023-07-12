import { Prisma } from ".prisma/client";
import { prisma } from "@/lib/prisma";
import { ISkinsRepository } from "../interface/ISkinsRepository";

export class PrismaSkinRepository implements ISkinsRepository {
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

  async findByMany() {
    const skinAll = await prisma.skin.findMany({
      where: { deletedAt: null },
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

  async create(data: Prisma.SkinCreateInput) {
    const skin = await prisma.skin.create({
      data,
    });
    return skin;
  }

  async deleteSkin(id: string) {
    const deleteSkin = await prisma.skin.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return deleteSkin;
  }
}
