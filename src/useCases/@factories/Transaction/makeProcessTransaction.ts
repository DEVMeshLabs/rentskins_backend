import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { ProcessTransaction } from "@/utils/processTransaction";

export function makeProcessTransaction() {
  const transactionRepository = new PrismaTransactionRepository();
  const walletRepository = new PrismaWalletRepository();
  const perfilRepository = new PrismaPerfilRepository();
  const skinRepository = new PrismaSkinRepository();
  const notificationsRepository = new PrismaNotificationRepository();
  const configurationRepository = new PrismaConfigurationRepository();
  const proTransaction = new ProcessTransaction(
    transactionRepository,
    perfilRepository,
    skinRepository,
    walletRepository,
    notificationsRepository,
    configurationRepository
  );
  return proTransaction;
}
