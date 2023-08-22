import { PrismaCartRepository } from "@/repositories/Prisma/prismaCartRepository";
import { PrismaSkinToCartRepository } from "@/repositories/Prisma/prismaSkinToCartRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { CreateSkinToCartUseCase } from "@/useCases/skinToCart/createSkinToCartUseCase";

export function makeCreateSkinToCart() {
  const prismaSkinToCartRepository = new PrismaSkinToCartRepository();
  const prismaSkinRepository = new PrismaSkinRepository();
  const prismaCartRepository = new PrismaCartRepository();
  const createSkinUseCase = new CreateSkinToCartUseCase(
    prismaSkinToCartRepository,
    prismaSkinRepository,
    prismaCartRepository
  );

  return createSkinUseCase;
}
