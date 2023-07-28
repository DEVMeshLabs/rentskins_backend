import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { GetConfigurationUseCase } from "@/useCases/Configuration/getConfigurationUseCase";

export function makeGetConfigurationUseCase() {
  const prismaConfigurationRepository = new PrismaConfigurationRepository();
  const getConfigurationUseCase = new GetConfigurationUseCase(
    prismaConfigurationRepository
  );

  return getConfigurationUseCase;
}
