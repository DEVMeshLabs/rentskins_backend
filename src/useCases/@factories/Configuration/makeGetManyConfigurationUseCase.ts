import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { GetManyConfigurationUseCase } from "@/useCases/Configuration/getManyConfigurationUseCase";

export function makeGetManyConfigurationUseCase() {
  const prismaConfigurationRepository = new PrismaConfigurationRepository();
  const getManyConfigurationUseCase = new GetManyConfigurationUseCase(
    prismaConfigurationRepository
  );

  return getManyConfigurationUseCase;
}
