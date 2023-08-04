import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ISkinToCartRepository } from "../interfaceRepository/ISkinToCartRepository";

export class PrismaSkinToCartRepository implements ISkinToCartRepository {
  async create(data: Prisma.SkinToCartCreateManyInput) {
    const createSkinToCart = await prisma.skinToCart.create({
      data,
    });
    return createSkinToCart;
  }
}
