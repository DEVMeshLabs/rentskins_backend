import { PrismaSkinToCartRepository } from "@/repositories/Prisma/prismaSkinToCartRepository";
import { CreateSkinToCartUseCase } from "@/useCases/skinToCart/createSkinToCartUseCase";

export function makeCreateSkinToCart() {
  const prismaSkinRepository = new PrismaSkinToCartRepository();
  const createSkinUseCase = new CreateSkinToCartUseCase(prismaSkinRepository);

  return createSkinUseCase;
}
