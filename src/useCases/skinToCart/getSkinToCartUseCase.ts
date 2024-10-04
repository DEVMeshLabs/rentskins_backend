import { SkinToCart } from "@prisma/client";
import { ISkinToCartRepository } from "@/repositories/interfaceRepository/ISkinToCartRepository";
import { SkinToCartNotExistError } from "../@errors/SkinToCart/skinToCartNotError";

export class GetSkinToCartUseCase {
  constructor(private skinToCart: ISkinToCartRepository) {}

  async execute(id: string): Promise<SkinToCart> {
    const getSkinToCart = await this.skinToCart.findById(id);

    if (!getSkinToCart) {
      throw new SkinToCartNotExistError();
    }

    return getSkinToCart;
  }
}
