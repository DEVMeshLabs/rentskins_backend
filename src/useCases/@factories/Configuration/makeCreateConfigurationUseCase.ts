import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { CreateConfigurationUseCase } from "@/useCases/Configuration/createConfigurationUseCase";

export function makeCreateConfigurationUseCase() {
  const prismaConfigurationRepository = new PrismaConfigurationRepository();
  const createConfigurationUseCase = new CreateConfigurationUseCase(
    prismaConfigurationRepository
  );

  return createConfigurationUseCase;
}
