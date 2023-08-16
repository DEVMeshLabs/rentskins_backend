import { SkinToCart } from "@prisma/client";
import { ISkinToCartRepository } from "@/repositories/interfaceRepository/ISkinToCartRepository";

export class DeleteSkinToCartUseCase {
  constructor(private skinToCart: ISkinToCartRepository) {}

  async execute(ids: string[]): Promise<SkinToCart> {
    const deleteSkin = await this.skinToCart.deleteSkin(ids);
    return deleteSkin;
  }
}
