import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { GetLastSellerSkinsUseCase } from "@/useCases/Skin/getLastSellerSkins";

export function makeGetLastSellerSkinsUseCase() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const getLastSellerSkins = new GetLastSellerSkinsUseCase(
    prismaSkinRepository
  );

  return getLastSellerSkins;
}
