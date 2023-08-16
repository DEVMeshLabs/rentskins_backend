import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { UpdateByIdUseCase } from "@/useCases/Configuration/updateByUserConfigurationUseCase";

export function makeUpdateConfigurationUseCase() {
  const prismaConfigurationRepository = new PrismaConfigurationRepository();
  const updateConfigurationUseCase = new UpdateByIdUseCase(
    prismaConfigurationRepository
  );

  return updateConfigurationUseCase;
}
