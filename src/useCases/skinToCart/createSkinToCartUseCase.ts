import { Prisma, SkinToCart } from "@prisma/client";
import { ISkinToCartRepository } from "@/repositories/interfaceRepository/ISkinToCartRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";
import { ICartRepository } from "@/repositories/interfaceRepository/ICartRepository";
import { CartNotExistError } from "../@errors/Cart/CartNotExistError";
import { SkinAlreadyExistsError } from "../@errors/Skin/SkinAlreadyExistsError";

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
    const [skin, cart, existingSkinToCart] = await Promise.all([
      await this.skinRepository.findById(skinId),
      await this.cartRepository.findById(cartId),
      await this.skinToCart.findBySkin(skinId),
    ]);

    if (!skin) {
      throw new SkinNotExistError();
    } else if (!cart) {
      throw new CartNotExistError();
    } else if (existingSkinToCart) {
      throw new SkinAlreadyExistsError();
    }

    const create = await this.skinToCart.create({
      cartId,
      skinId,
    });
    return create;
  }
}
