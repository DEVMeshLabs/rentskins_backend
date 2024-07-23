import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaTransactionHistoryRepository } from "@/repositories/Prisma/prismaTransactionHistory";
import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CronJobProcessTransaction } from "@/utils/CronJobProcessTransaction";

export function makeCronJobProcessTransaction() {
  const transactionHistoryRepository = new PrismaTransactionHistoryRepository();
  const transactionRepository = new PrismaTransactionRepository();
  const notificationRepository = new PrismaNotificationRepository();
  const walletRepository = new PrismaWalletRepository();
  const perfilRepository = new PrismaPerfilRepository();
  const skinRepository = new PrismaSkinRepository();
  const functionCron = new CronJobProcessTransaction(
    transactionHistoryRepository,
    transactionRepository,
    notificationRepository,
    walletRepository,
    perfilRepository,
    skinRepository
  );
  return functionCron;
}
