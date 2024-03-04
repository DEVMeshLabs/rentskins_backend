import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaTransactionHistoryRepository } from "@/repositories/Prisma/prismaTransactionHistory";
import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CronJobProcessTransaction } from "@/utils/CronJobProcessTransaction";

export function makeCronJobProcessTransaction() {
  const transactionHistoryRepository = new PrismaTransactionHistoryRepository();
  const transactionRepository = new PrismaTransactionRepository();
  const configurationRepository = new PrismaConfigurationRepository();
  const notificationRepository = new PrismaNotificationRepository();
  const walletRepository = new PrismaWalletRepository();
  const perfilRepository = new PrismaPerfilRepository();
  const functionCron = new CronJobProcessTransaction(
    transactionHistoryRepository,
    transactionRepository,
    configurationRepository,
    notificationRepository,
    walletRepository,
    perfilRepository
  );
  return functionCron;
}