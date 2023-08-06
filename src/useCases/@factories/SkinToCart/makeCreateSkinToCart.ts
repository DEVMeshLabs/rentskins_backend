import { PrismaSkinToCartRepository } from "@/repositories/Prisma/prismaSkinToCartRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { CreateSkinToCartUseCase } from "@/useCases/SkinToCart/createSkinToCartUseCase";

export function makeCreateSkinToCart() {
  const prismaSkinToCartRepository = new PrismaSkinToCartRepository();
  const prismaSkinRepository = new PrismaSkinRepository();
  const createSkinUseCase = new CreateSkinToCartUseCase(
    prismaSkinToCartRepository,
    prismaSkinRepository
  );

  return createSkinUseCase;
}
