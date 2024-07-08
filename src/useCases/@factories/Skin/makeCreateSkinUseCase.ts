import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { CreateSkinUseCase } from "@/useCases/Skin/createSkinUseCase";

export function makeCreateUseCase() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const configurationRepository = new PrismaConfigurationRepository();
  const transactionRepository = new PrismaTransactionRepository();
  const createSkinUseCase = new CreateSkinUseCase(
    prismaSkinRepository,
    configurationRepository,
    transactionRepository
  );

  return createSkinUseCase;
}
