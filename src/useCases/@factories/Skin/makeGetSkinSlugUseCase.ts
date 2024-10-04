import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { GetSkinSlugUseCase } from "@/useCases/Skin/getSkinSlugUseCase";

export function makeSkinSlugUseCase() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const getskinSlugUseCase = new GetSkinSlugUseCase(prismaSkinRepository);

  return getskinSlugUseCase;
}
