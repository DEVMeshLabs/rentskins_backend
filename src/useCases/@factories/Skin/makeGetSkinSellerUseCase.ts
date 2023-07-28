import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { GetSkinSellerUseCase } from "@/useCases/Skin/getSkinSellerUseCase";

export function makeGetSkinSeller() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const getSkinSellerUseCase = new GetSkinSellerUseCase(prismaSkinRepository);

  return getSkinSellerUseCase;
}
