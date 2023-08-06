import { Prisma, SkinToCart } from "@prisma/client";
import { ISkinToCartRepository } from "@/repositories/interfaceRepository/ISkinToCartRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";

export class CreateSkinToCartUseCase {
  constructor(
    private skinToCart: ISkinToCartRepository,
    private skinRepository: ISkinsRepository
  ) {}

  async execute({
    cartId,
    skinId,
  }: Prisma.SkinToCartCreateManyInput): Promise<SkinToCart> {
    const verifySkin = await this.skinRepository.findById(skinId);

    if (!verifySkin) {
      throw new SkinNotExistError();
    }

    const create = await this.skinToCart.create({
      cartId,
      skinId,
    });
    return create;
  }
}
