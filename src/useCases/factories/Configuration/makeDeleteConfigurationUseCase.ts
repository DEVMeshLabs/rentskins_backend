import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { DeleteConfigurationUseCase } from "@/useCases/Configuration/deleteConfigurationUseCase";

export function makeDeleteConfigurationUseCase() {
  const prismaConfigurationRepository = new PrismaConfigurationRepository();
  const deleteConfigurationUseCase = new DeleteConfigurationUseCase(
    prismaConfigurationRepository
  );

  return deleteConfigurationUseCase;
}
