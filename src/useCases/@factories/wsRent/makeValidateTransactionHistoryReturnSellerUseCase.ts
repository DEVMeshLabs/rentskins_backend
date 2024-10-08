import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { ValidateTransactionHistoryReturnSellerTransactionRentalUseCase } from "@/useCases/wsRent/validateTransactionHistoryReturnSellerTransactionRentalUseCase";

export function makeValidateTransactionHistoryReturnSellerUseCase() {
  const prismaRentalTransaction = new PrismaRentalTransactionRepository();
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const prismaPerfilRepository = new PrismaPerfilRepository();
  const prismaSkinRepository = new PrismaSkinRepository();
  const prismaWalletRepository = new PrismaWalletRepository();

  const validateTransactionHistoryRentalUseCase =
    new ValidateTransactionHistoryReturnSellerTransactionRentalUseCase(
      prismaRentalTransaction,
      prismaNotificationRepository,
      prismaPerfilRepository,
      prismaSkinRepository,
      prismaWalletRepository
    );

  return validateTransactionHistoryRentalUseCase;
}
