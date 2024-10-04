import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaTransactionHistoryRepository } from "@/repositories/Prisma/prismaTransactionHistory";
import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CreateTransactionUseCase } from "@/useCases/Transaction/createTransactionUseCase";

export function makeCreateTransactionUseCase() {
  const perfilRepository = new PrismaPerfilRepository();
  const transactionRepository = new PrismaTransactionRepository();
  const skinRepository = new PrismaSkinRepository();
  const walletRepository = new PrismaWalletRepository();
  const notificationsRepository = new PrismaNotificationRepository();
  const configurationRepository = new PrismaConfigurationRepository();
  const transactionHistoryRepository = new PrismaTransactionHistoryRepository();
  const createTransaction = new CreateTransactionUseCase(
    transactionRepository,
    transactionHistoryRepository,
    perfilRepository,
    skinRepository,
    walletRepository,
    notificationsRepository,
    configurationRepository
  );
  return createTransaction;
}
