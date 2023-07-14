import { prisma } from "@/lib/prisma";
import { ICartRepository } from "../interface/ICartRepository";
import { Prisma } from "@prisma/client";

export class PrismaCartRepository implements ICartRepository {
  async findByMany() {
    const findMany = await prisma.cart.findMany({
      where: { deletedAt: null },
    });
    return findMany;
  }

  async create(data: Prisma.CartCreateInput) {
    const createCart = await prisma.cart.create({
      data,
    });

    return createCart;
  }

  async;
}
