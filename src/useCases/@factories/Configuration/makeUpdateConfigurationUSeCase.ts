import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { UpdateByUserConfigurationUseCase } from "@/useCases/Configuration/updateByUserConfigurationUseCase";

export function makeUpdateConfigurationUseCase() {
  const prismaConfigurationRepository = new PrismaConfigurationRepository();
  const updateConfigurationUseCase = new UpdateByUserConfigurationUseCase(
    prismaConfigurationRepository
  );

  return updateConfigurationUseCase;
}
