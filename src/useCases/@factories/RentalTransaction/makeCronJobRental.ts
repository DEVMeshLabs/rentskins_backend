import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaTransactionHistoryRepository } from "@/repositories/Prisma/prismaTransactionHistory";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CronJobProcessRental } from "@/utils/CronJobProcessRental";

export function makeCronJobProcessRental() {
  const transactionHistoryRepository = new PrismaTransactionHistoryRepository();
  const rentalRepository = new PrismaRentalTransactionRepository();
  const configurationRepository = new PrismaConfigurationRepository();
  const notificationRepository = new PrismaNotificationRepository();
  const walletRepository = new PrismaWalletRepository();
  const perfilRepository = new PrismaPerfilRepository();
  const skinRepository = new PrismaSkinRepository();
  const functionCron = new CronJobProcessRental(
    transactionHistoryRepository,
    rentalRepository,
    configurationRepository,
    notificationRepository,
    walletRepository,
    perfilRepository,
    skinRepository
  );
  return functionCron;
}
