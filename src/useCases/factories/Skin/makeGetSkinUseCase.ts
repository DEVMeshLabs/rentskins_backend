import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { GetSkinUseCase } from "@/useCases/Skin/getSkinUseCase";

export function makeGetSkinUseCase() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const getskinUseCase = new GetSkinUseCase(prismaSkinRepository);

  return getskinUseCase;
}
