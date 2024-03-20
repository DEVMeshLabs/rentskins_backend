import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaTransactionHistoryRepository } from "@/repositories/Prisma/prismaTransactionHistory";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CreateRentalTransactionUseCase } from "@/useCases/RentalTransaction/createRentalTransactionUseCase";

export function makeCreateRentalTransactionUseCase() {
  const prismaRentalTransactionRepository =
    new PrismaRentalTransactionRepository();

  const prismaSkinRepository = new PrismaSkinRepository();
  const prismaPerfilRepository = new PrismaPerfilRepository();
  const prismaWalletRepository = new PrismaWalletRepository();
  const prismaTransactionHistoryRepository =
    new PrismaTransactionHistoryRepository();
  const prismaNotificationRepository = new PrismaNotificationRepository();

  const createRentalTransaction = new CreateRentalTransactionUseCase(
    prismaRentalTransactionRepository,
    prismaTransactionHistoryRepository,
    prismaSkinRepository,
    prismaPerfilRepository,
    prismaWalletRepository,
    prismaNotificationRepository
  );

  return createRentalTransaction;
}
