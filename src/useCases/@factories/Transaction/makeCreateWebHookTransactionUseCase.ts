import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CreateWebHookTransactionUseCase } from "@/useCases/Transaction/createWebHookTransaction";

export function makeCreateWebHookTransactionUseCase() {
  const walletRepository = new PrismaWalletRepository();
  const createSkinUseCase = new CreateWebHookTransactionUseCase(
    walletRepository
  );
  return createSkinUseCase;
}
