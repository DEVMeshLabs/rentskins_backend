import { PrismaCartRepository } from "@/repositories/Prisma/prismaCartRepository";
import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CreatePerfilUseCase } from "@/useCases/Perfil/createPerfilUseCase";

export function makeCreatePerfil() {
  const prismaPerfil = new PrismaPerfilRepository();
  const prismaConfiguration = new PrismaConfigurationRepository();
  const prismaWallet = new PrismaWalletRepository();
  const prismaCart = new PrismaCartRepository();
  const createPerfilUseCase = new CreatePerfilUseCase(
    prismaPerfil,
    prismaConfiguration,
    prismaWallet,
    prismaCart
  );

  return createPerfilUseCase;
}
