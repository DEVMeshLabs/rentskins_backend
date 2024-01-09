import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CreateRentalTransactionUseCase } from "@/useCases/RentalTransaction/createRentalTransactionUseCase";

export function makeCreateRentalTransactionUseCase() {
  const prismaRentalTransactionRepository =
    new PrismaRentalTransactionRepository();

  const prismaSkinRepository = new PrismaSkinRepository();
  const prismaPerfilRepository = new PrismaPerfilRepository();
  const prismaWalletRepository = new PrismaWalletRepository();
  const prismaNotificationRepository = new PrismaNotificationRepository();

  const createRentalTransaction = new CreateRentalTransactionUseCase(
    prismaRentalTransactionRepository,
    prismaSkinRepository,
    prismaPerfilRepository,
    prismaWalletRepository,
    prismaNotificationRepository
  );

  return createRentalTransaction;
}
