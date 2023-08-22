import { Prisma, SkinToCart } from "@prisma/client";
import { ISkinToCartRepository } from "@/repositories/interfaceRepository/ISkinToCartRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";
import { ICartRepository } from "@/repositories/interfaceRepository/ICartRepository";
import { CartNotExistError } from "../@errors/Cart/CartNotExistError";

export class CreateSkinToCartUseCase {
  constructor(
    private skinToCart: ISkinToCartRepository,
    private skinRepository: ISkinsRepository,
    private cartRepository: ICartRepository
  ) {}

  async execute({
    cartId,
    skinId,
  }: Prisma.SkinToCartCreateManyInput): Promise<SkinToCart> {
    const verifySkin = await this.skinRepository.findById(skinId);
    const isNotExistCart = await this.cartRepository.findById(cartId);

    if (!verifySkin) {
      throw new SkinNotExistError();
    }

    if (!isNotExistCart) {
      throw new CartNotExistError();
    }

    const create = await this.skinToCart.create({
      cartId,
      skinId,
    });
    return create;
  }
}
