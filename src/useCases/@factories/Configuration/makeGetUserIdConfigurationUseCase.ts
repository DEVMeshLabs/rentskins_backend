import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { GetUserIdConfigurationUseCase } from "@/useCases/Configuration/getUserConfigurationUseCase";

export function makeGetUserIdConfigurationUseCase() {
  const prismaConfigurationRepository = new PrismaConfigurationRepository();
  const getUserConfigurationUseCase = new GetUserIdConfigurationUseCase(
    prismaConfigurationRepository
  );

  return getUserConfigurationUseCase;
}
