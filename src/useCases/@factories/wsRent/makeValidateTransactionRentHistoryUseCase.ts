import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { ValidateTransactionHistoryRentalUseCase } from "@/useCases/wsRent/validateTransactionHistoryRentalUseCase";

export function makeValidateTransactionRentHistoryUseCase() {
  const prismaRentalTransaction = new PrismaRentalTransactionRepository();
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const prismaPerfilRepository = new PrismaPerfilRepository();
  const prismaSkinRepository = new PrismaSkinRepository();

  const validateTransactionHistoryRentalUseCase =
    new ValidateTransactionHistoryRentalUseCase(
      prismaRentalTransaction,
      prismaNotificationRepository,
      prismaPerfilRepository,
      prismaSkinRepository
    );

  return validateTransactionHistoryRentalUseCase;
}
