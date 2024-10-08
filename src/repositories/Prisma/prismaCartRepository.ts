import { prisma } from "@/lib/prisma";
import { ICartRepository } from "../interfaceRepository/ICartRepository";
import { Prisma } from "@prisma/client";

export class PrismaCartRepository implements ICartRepository {
  async create(data: Prisma.CartCreateInput) {
    const createCart = await prisma.cart.create({
      data,
    });

    return createCart;
  }

  async updateByUser(owner_id: string, date: Prisma.CartUncheckedUpdateInput) {
    const updateId = await prisma.cart.update({
      where: { buyer_id: owner_id },
      data: { ...date, updatedAt: new Date() },
    });
    return updateId;
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
      include: { SkinToCart: { include: { skin: true } } },
    });
    return findMany;
  }

  async findById(id: string) {
    const findId = await prisma.cart.findFirst({
      where: { id, deletedAt: null },
      include: { SkinToCart: { include: { skin: true } } },
    });
    return findId;
  }

  async findByBuyer(buyer_id: string) {
    const findBuyer = await prisma.cart.findFirst({
      where: { buyer_id, deletedAt: null },
      include: { SkinToCart: { include: { skin: true } } },
    });
    return findBuyer;
  }

  async deleteId(id: string) {
    const deleteId = await prisma.cart.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return deleteId;
  }
}
