import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { UpdateTransactionRentalBuyUseCase } from "@/useCases/TransactionRental/updateTransactionRentalBuyUseCase";

export function makeUpdateTransactionRentalBuyUseCase() {
  const prismaRentalTransactionRepository =
    new PrismaRentalTransactionRepository();
  const prismaSkinRepository = new PrismaSkinRepository();
  const prismaWalletRepository = new PrismaWalletRepository();
  const prismaPerfilRepository = new PrismaPerfilRepository();
  const prismaNotificationRepository = new PrismaNotificationRepository();

  const updateTransactionRentalBuy = new UpdateTransactionRentalBuyUseCase(
    prismaRentalTransactionRepository,
    prismaSkinRepository,
    prismaWalletRepository,
    prismaPerfilRepository,
    prismaNotificationRepository
  );

  return updateTransactionRentalBuy;
}
