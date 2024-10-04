import { PrismaCartRepository } from "@/repositories/Prisma/prismaCartRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CreateWalletUseCase } from "@/useCases/Wallet/createWalletUseCase";

export function makeCreateWalletUseCase() {
  const prismaWalletRepository = new PrismaWalletRepository();
  const prismaCartRepository = new PrismaCartRepository();
  const prismaPerfilRepository = new PrismaPerfilRepository();
  const createWalletUseCase = new CreateWalletUseCase(
    prismaWalletRepository,
    prismaCartRepository,
    prismaPerfilRepository
  );

  return createWalletUseCase;
}
