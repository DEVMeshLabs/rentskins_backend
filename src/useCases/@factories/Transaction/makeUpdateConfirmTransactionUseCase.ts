import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { UpdateConfirmTransactionUseCase } from "@/useCases/Transaction/UpdateConfirmTransactionUseCase";

export function makeUpdateConfirmTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const walletRepository = new PrismaWalletRepository();
  const createSkinUseCase = new UpdateConfirmTransactionUseCase(
    transactionRepository,
    walletRepository
  );
  return createSkinUseCase;
}
