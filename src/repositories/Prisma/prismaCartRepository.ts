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
}
