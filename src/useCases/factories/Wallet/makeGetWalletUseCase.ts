import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { GetWalletUseCase } from "@/useCases/Wallet/getWalletUseCase";

export function makeGetWalletUseCase() {
  const prismaWalletRepository = new PrismaWalletRepository();
  const createWalletUseCase = new GetWalletUseCase(prismaWalletRepository);

  return createWalletUseCase;
}
