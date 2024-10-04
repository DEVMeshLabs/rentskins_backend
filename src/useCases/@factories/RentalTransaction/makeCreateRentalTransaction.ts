import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { PrismaSkinGuaranteeRepository } from "@/repositories/Prisma/prismaSkinGuaranteeRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaTransactionHistoryRepository } from "@/repositories/Prisma/prismaTransactionHistory";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CreateTransactionRentalUseCase } from "@/useCases/TransactionRental/createTransactionRentalUseCase";

export function makeCreateTransactionRentalUseCase() {
  const prismaRentalTransactionRepository =
    new PrismaRentalTransactionRepository();

  const prismaSkinRepository = new PrismaSkinRepository();
  const prismaPerfilRepository = new PrismaPerfilRepository();
  const prismaWalletRepository = new PrismaWalletRepository();
  const prismaTransactionHistoryRepository =
    new PrismaTransactionHistoryRepository();
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const prismaSkinGuaranteeRepository = new PrismaSkinGuaranteeRepository();

  const createRentalTransaction = new CreateTransactionRentalUseCase(
    prismaRentalTransactionRepository,
    prismaTransactionHistoryRepository,
    prismaSkinRepository,
    prismaSkinGuaranteeRepository,
    prismaPerfilRepository,
    prismaWalletRepository,
    prismaNotificationRepository
  );

  return createRentalTransaction;
}
