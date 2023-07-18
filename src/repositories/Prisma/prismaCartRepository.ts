import { prisma } from "@/lib/prisma";
import { ICartRepository } from "../interface/ICartRepository";
import { Prisma } from "@prisma/client";

export class PrismaCartRepository implements ICartRepository {
  async create(data: Prisma.CartCreateInput) {
    const createCart = await prisma.cart.create({
      data,
    });

    return createCart;
  }

  async updateById(id: string, data: Prisma.CartUpdateInput) {
    const update = await prisma.cart.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
    return update;
  }

  async findByMany() {
    const findMany = await prisma.cart.findMany({
      where: { deletedAt: null },
      include: { buyer_skins: true },
    });
    return findMany;
  }

  async findById(id: string) {
    const findId = await prisma.cart.findFirst({
      include: { buyer_skins: true },
      where: { id, deletedAt: null },
    });
    return findId;
  }

  async findByBuyer(buyer_id: string) {
    const findBuyer = await prisma.cart.findFirst({
      include: { buyer_skins: true },
      where: { buyer_id, deletedAt: null },
    });
    return findBuyer;
  }
}