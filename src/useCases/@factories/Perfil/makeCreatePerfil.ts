import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { CreatePerfilUseCase } from "@/useCases/Perfil/createPerfilUseCase";

export function makeCreatePerfil() {
  const prismaPerfil = new PrismaPerfilRepository();
  const prismaConfiguration = new PrismaConfigurationRepository();
  const createPerfilUseCase = new CreatePerfilUseCase(
    prismaPerfil,
    prismaConfiguration
  );

  return createPerfilUseCase;
}
