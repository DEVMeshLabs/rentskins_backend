import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { CreateSkinUseCase } from "@/useCases/Skin/createSkinUseCase";

export function makeCreateUseCase() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const createSkinUseCase = new CreateSkinUseCase(prismaSkinRepository);

  return createSkinUseCase;
}
