import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { CreateSkinUseCase } from "@/useCases/Skin/createSkinUseCase";

export function makeCreateUseCase() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const configurationRepository = new PrismaConfigurationRepository();
  const createSkinUseCase = new CreateSkinUseCase(
    prismaSkinRepository,
    configurationRepository
  );

  return createSkinUseCase;
}
