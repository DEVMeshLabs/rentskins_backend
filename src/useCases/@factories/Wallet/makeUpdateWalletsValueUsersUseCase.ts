import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { UpdateWalletsValueUsersUseCase } from "@/useCases/Wallet/updateWalletsValueUsersUseCase";

export function makeUpdateWalletsValueUsersUseCase() {
  const prismaWalletRepository = new PrismaWalletRepository();
  const updateWalletValue = new UpdateWalletsValueUsersUseCase(
    prismaWalletRepository
  );

  return updateWalletValue;
}
