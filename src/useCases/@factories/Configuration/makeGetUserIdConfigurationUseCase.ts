import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { GetUserIdConfigurationUseCase } from "@/useCases/Configuration/getUserConfigurationUSeCase";

export function makeGetUserIdConfigurationUseCase() {
  const prismaConfigurationRepository = new PrismaConfigurationRepository();
  const getUserConfigurationUseCase = new GetUserIdConfigurationUseCase(
    prismaConfigurationRepository
  );

  return getUserConfigurationUseCase;
}
