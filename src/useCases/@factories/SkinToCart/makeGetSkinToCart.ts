import { PrismaSkinToCartRepository } from "@/repositories/Prisma/prismaSkinToCartRepository";
import { GetSkinToCartUseCase } from "@/useCases/skinToCart/getSkinToCartUseCase";

export function makeGetSkinToCart() {
  const prismaSkinRepository = new PrismaSkinToCartRepository();
  const getSkinToCart = new GetSkinToCartUseCase(prismaSkinRepository);

  return getSkinToCart;
}
