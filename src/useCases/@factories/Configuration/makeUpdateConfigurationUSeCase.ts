import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { UpdateByIdUseCase } from "@/useCases/Configuration/updateByIdConfigurationUseCase";

export function makeUpdateConfigurationUseCase() {
  const prismaConfigurationRepository = new PrismaConfigurationRepository();
  const updateConfigurationUseCase = new UpdateByIdUseCase(
    prismaConfigurationRepository
  );

  return updateConfigurationUseCase;
}
