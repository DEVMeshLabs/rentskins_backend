import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { GetUserConfigurationUseCase } from "@/useCases/Configuration/getUserConfigurationUseCase";

export function makeGetUserConfigurationUseCase() {
  const prismaConfigurationRepository = new PrismaConfigurationRepository();
  const getUserConfigurationUseCase = new GetUserConfigurationUseCase(
    prismaConfigurationRepository
  );

  return getUserConfigurationUseCase;
}
