import { Prisma, SkinToCart } from "@prisma/client";
import { ISkinToCartRepository } from "@/repositories/interfaceRepository/ISkinToCartRepository";

export class CreateSkinToCartUseCase {
  constructor(private skinToCart: ISkinToCartRepository) {}

  async execute({
    cartId,
    skinId,
  }: Prisma.SkinToCartCreateManyInput): Promise<SkinToCart> {
    const create = await this.skinToCart.create({
      cartId,
      skinId,
    });
    return create;
  }
}
