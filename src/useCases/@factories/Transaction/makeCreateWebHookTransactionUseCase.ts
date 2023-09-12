import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CreateWebHookTransactionUseCase } from "@/useCases/Transaction/createWebHookTransaction";

export function makeCreateWebHookTransactionUseCase() {
  const perfilRepository = new PrismaPerfilRepository();
  const walletRepository = new PrismaWalletRepository();
  const createSkinUseCase = new CreateWebHookTransactionUseCase(
    walletRepository,
    perfilRepository
  );
  return createSkinUseCase;
}
