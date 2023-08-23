import { prisma } from "@/lib/prisma";
import { Prisma, SkinToCart } from "@prisma/client";
import { ISkinToCartRepository } from "../interfaceRepository/ISkinToCartRepository";

export class PrismaSkinToCartRepository implements ISkinToCartRepository {
  async create(data: Prisma.SkinToCartCreateManyInput) {
    const createSkinToCart = await prisma.skinToCart.create({
      data,
    });
    return createSkinToCart;
  }

  async deleteSkin(id: string) {
    const deleteSkinToCart = await prisma.skinToCart.delete({
      where: { id },
    });
    return deleteSkinToCart;
  }

  async findById(id: string): Promise<SkinToCart> {
    const findSkinToCart = await prisma.skinToCart.findUnique({
      where: { id },
    });
    return findSkinToCart;
  }

  async findBySkin(id: string): Promise<SkinToCart> {
    const findSkinToCart = await prisma.skinToCart.findFirst({
      where: { skinId: id },
    });
    return findSkinToCart;
  }
}
