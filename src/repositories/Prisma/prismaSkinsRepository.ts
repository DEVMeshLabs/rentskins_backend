import { Prisma } from ".prisma/client";
import { prisma } from "@/lib/prisma";
import { ISkinsRepository } from "../interfaceRepository/ISkinsRepository";

export class PrismaSkinRepository implements ISkinsRepository {
  async findLastSellerSkins(name: string) {
    const findAllLastSeller = await prisma.skin.findMany({
      where: {
        skin_name: name,
        status: "Concluído",
      },
      orderBy: { createdAt: "desc" },
    });

    return findAllLastSeller;
  }

  async create(data: Prisma.SkinCreateManyInput) {
    const skin = await prisma.skin.createMany({
      data,
    });
    return skin;
  }

  async findByManySeller(seller_id: string, deletedAt: string) {
    const findSeller = prisma.skin.findMany({
      where:
        deletedAt === "false"
          ? { seller_id, deletedAt: null, status: null }
          : { seller_id },
      orderBy: { createdAt: "desc" },
    });

    return findSeller;
  }

  async findBySearch(
    search: string,
    type: string,
    page: number,
    pageSize: number
  ) {
    let whereCondition: Object;

    if (type === "name") {
      whereCondition = {
        skin_name: { contains: search, mode: "insensitive" },
      };
    } else if (type === "category") {
      if (search === "Diversos") {
        whereCondition = {
          OR: [
            { skin_category: { contains: "Container", mode: "insensitive" } },
            { skin_category: { contains: "Collectible", mode: "insensitive" } },
          ],
        };
      } else {
        whereCondition = {
          skin_category: { contains: search, mode: "insensitive" },
        };
      }
    } else if (type === "weapon") {
      whereCondition = {
        skin_weapon: { contains: search, mode: "insensitive" },
      };
    }

    const findName = await prisma.skin.findMany({
      where: {
        ...whereCondition,
        status: null,
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    return findName;
  }

  async findByMany(page: number, pageSize: number) {
    const skinAll = await prisma.skin.findMany({
      where: { deletedAt: null, status: null },
      orderBy: { createdAt: "desc" },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    return skinAll;
  }

  async findManyAssent() {
    const skinAllAssent = await prisma.skin.findMany({
      where: { deletedAt: null, status: null },
      orderBy: { createdAt: "desc" },
    });
    return skinAllAssent;
  }

  async findBySeller(seller_id: string) {
    const findSeller = await prisma.skin.findFirst({
      where: { seller_id, deletedAt: null, status: null },
    });
    return findSeller;
  }

  async findByManyCategory(skin_category: string) {
    const findManyCategory = await prisma.skin.findMany({
      where: { skin_category, deletedAt: null, status: null },
      orderBy: { createdAt: "desc" },
    });

    return findManyCategory;
  }

  async findByManyWeapon(skin_weapon: string) {
    const findWeapon = await prisma.skin.findMany({
      where: { skin_weapon, deletedAt: null, status: null },
      orderBy: { createdAt: "desc" },
    });

    return findWeapon;
  }

  async findByCountSkins() {
    const countSkins = await prisma.skin.count({
      where: { deletedAt: null, status: null },
    });
    return countSkins;
  }

  async findByCountSellers(seller_id: string) {
    const countSkins = await prisma.skin.count({
      where: { seller_id, deletedAt: null, status: null },
    });
    return countSkins;
  }

  async findByCountSearch(search: string) {
    const findSearch = await prisma.skin.count({
      where: {
        OR: [
          { skin_name: { contains: search, mode: "insensitive" } },
          { skin_category: { contains: search, mode: "insensitive" } },
          { skin_weapon: { contains: search, mode: "insensitive" } },
        ],
        deletedAt: null,
        status: null,
      },
    });
    return findSearch;
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

  async findBySlug(slug: string) {
    const skinSlug = await prisma.skin.findFirst({
      where: { slug, deletedAt: null },
    });

    return skinSlug;
  }

  async deleteSkin(id: string) {
    const response = await Promise.all([
      await prisma.notification.deleteMany({
        where: {
          skin: {
            id,
          },
        },
      }),
      await prisma.skinToCart.deleteMany({
        where: {
          skin: {
            id,
          },
        },
      }),
      await prisma.skin.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      }),
    ]);

    return response[2];
  }
}
