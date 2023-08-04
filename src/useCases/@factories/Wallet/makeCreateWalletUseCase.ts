import { PrismaCartRepository } from "@/repositories/Prisma/prismaCartRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CreateWalletUseCase } from "@/useCases/Wallet/createWalletUseCase";

export function makeCreateWalletUseCase() {
  const prismaWalletRepository = new PrismaWalletRepository();
  const prismaCartRepository = new PrismaCartRepository();
  const createWalletUseCase = new CreateWalletUseCase(
    prismaWalletRepository,
    prismaCartRepository
  );

  return createWalletUseCase;
}
