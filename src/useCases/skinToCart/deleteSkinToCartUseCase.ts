import { SkinToCart } from "@prisma/client";
import { ISkinToCartRepository } from "@/repositories/interfaceRepository/ISkinToCartRepository";
import { SkinToCartNotExistError } from "../@errors/SkinToCart/skinToCartNotError";

export class DeleteSkinToCartUseCase {
  constructor(private skinToCart: ISkinToCartRepository) {}

  async execute(id: string): Promise<SkinToCart> {
    const findSkinToCart = this.skinToCart.findById(id);

    if (!findSkinToCart) {
      throw new SkinToCartNotExistError();
    }

    const deleteSkin = await this.skinToCart.deleteSkin(id);
    return deleteSkin;
  }
}
