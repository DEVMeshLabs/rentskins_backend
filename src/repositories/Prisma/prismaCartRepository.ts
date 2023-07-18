import { prisma } from "@/lib/prisma";
import { ICartRepository } from "../interface/ICartRepository";
import { Prisma } from "@prisma/client";

export class PrismaCartRepository implements ICartRepository {
  async findByMany() {
    const findMany = await prisma.cart.findMany({
      where: { deletedAt: null },
      include: { buyer_skins: true },
    });
    return findMany;
  }

  async create(data: Prisma.CartCreateInput) {
    const createCart = await prisma.cart.create({
      data,
    });

    return createCart;
  }

  async findById(id: string) {
    const findId = await prisma.cart.findFirst({
      include: { buyer_skins: true },
      where: { id, deletedAt: null },
    });
    return findId;
  }
}
