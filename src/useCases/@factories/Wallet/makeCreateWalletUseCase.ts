import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CreateWalletUseCase } from "@/useCases/Wallet/createWalletUseCase";

export function makeCreateWalletUseCase() {
  const prismaWalletRepository = new PrismaWalletRepository();
  const createWalletUseCase = new CreateWalletUseCase(prismaWalletRepository);

  return createWalletUseCase;
}
