import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { UpdateWalletValueUseCase } from "@/useCases/Wallet/updateWalletValueUseCase";

export function makeUpdateWalletValueUseCase() {
  const prismaWalletRepository = new PrismaWalletRepository();
  const updateWalletValue = new UpdateWalletValueUseCase(
    prismaWalletRepository
  );

  return updateWalletValue;
}
