import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CreateTransactionUseCase } from "@/useCases/Transaction/createTransactionUseCase";

export function makeCreateTransactionUseCase() {
  const perfilRepository = new PrismaPerfilRepository();
  const transactionRepository = new PrismaTransactionRepository();
  const skinRepository = new PrismaSkinRepository();
  const walletRepository = new PrismaWalletRepository();
  const createTransaction = new CreateTransactionUseCase(
    transactionRepository,
    perfilRepository,
    skinRepository,
    walletRepository
  );
  return createTransaction;
}
