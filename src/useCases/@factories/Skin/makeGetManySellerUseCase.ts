import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { GetManySellerUseCase } from "@/useCases/Skin/getManySellerUseCase";

export function makeGetManySellerUseCase() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const getManyName = new GetManySellerUseCase(prismaSkinRepository);

  return getManyName;
}
