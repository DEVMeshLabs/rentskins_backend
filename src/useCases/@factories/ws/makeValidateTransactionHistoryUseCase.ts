import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaTransactionHistoryRepository } from "@/repositories/Prisma/prismaTransactionHistory";
import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { ValidateTransactionHistoryUseCase } from "@/useCases/ws/validateTransactionHistoryUseCase";

export function makeValidateTransactionHistoryUseCase() {
  const prismatransactionHistoryRepository =
    new PrismaTransactionHistoryRepository();
  const prismaTrasactionRepository = new PrismaTransactionRepository();
  const prismaConfigurationRepository = new PrismaConfigurationRepository();
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const prismaWalletRepository = new PrismaWalletRepository();
  const prismaPerfilRepository = new PrismaPerfilRepository();
  const prismaSkinRepository = new PrismaSkinRepository();

  const validateTransactionHistoryUseCase =
    new ValidateTransactionHistoryUseCase(
      prismatransactionHistoryRepository,
      prismaTrasactionRepository,
      prismaConfigurationRepository,
      prismaNotificationRepository,
      prismaWalletRepository,
      prismaPerfilRepository,
      prismaSkinRepository
    );

  return validateTransactionHistoryUseCase;
}
