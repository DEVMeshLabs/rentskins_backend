import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { GetUserConfigurationUseCase } from "@/useCases/Configuration/getUserConfigurationUSeCase";

export function makeGetUserConfigurationUseCase() {
  const prismaConfigurationRepository = new PrismaConfigurationRepository();
  const getUserConfigurationUseCase = new GetUserConfigurationUseCase(
    prismaConfigurationRepository
  );

  return getUserConfigurationUseCase;
}
