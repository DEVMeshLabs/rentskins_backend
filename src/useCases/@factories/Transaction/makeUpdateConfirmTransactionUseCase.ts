import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { UpdateConfirmTransactionUseCase } from "@/useCases/Transaction/UpdateConfirmTransactionUseCase";

export function makeUpdateConfirmTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const walletRepository = new PrismaWalletRepository();
  const perfilRepository = new PrismaPerfilRepository();
  const createSkinUseCase = new UpdateConfirmTransactionUseCase(
    transactionRepository,
    perfilRepository,
    walletRepository
  );
  return createSkinUseCase;
}
