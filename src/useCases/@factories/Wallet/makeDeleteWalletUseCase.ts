import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { DeleteWalletUseCase } from "@/useCases/Wallet/deleteWalletUseCase";

export function makeDeleteWalletUseCase() {
  const prismaWalletRepository = new PrismaWalletRepository();
  const deleteWalletUseCase = new DeleteWalletUseCase(prismaWalletRepository);

  return deleteWalletUseCase;
}
