// import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
// import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
// import { PrismaTransactionHistoryRepository } from "@/repositories/Prisma/prismaTransactionHistory";
import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { CronJobProcessRental } from "@/utils/CronJobProcessRental";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";

export function makeCronJobProcessRental() {
  const rentalRepository = new PrismaRentalTransactionRepository();
  // const configurationRepository = new PrismaConfigurationRepository();
  const notificationRepository = new PrismaNotificationRepository();
  const walletRepository = new PrismaWalletRepository();
  const perfilRepository = new PrismaPerfilRepository();
  const skinRepository = new PrismaSkinRepository();
  const functionCron = new CronJobProcessRental(
    rentalRepository,
    walletRepository,
    notificationRepository,
    skinRepository,
    perfilRepository
  );
  return functionCron;
}
