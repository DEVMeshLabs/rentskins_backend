import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { UpdateConfirmTransactionUseCase } from "@/useCases/Transaction/updateConfirmTransactionUseCase";

export function makeUpdateConfirmTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const walletRepository = new PrismaWalletRepository();
  const perfilRepository = new PrismaPerfilRepository();
  const skinRepository = new PrismaSkinRepository();
  const notificationsRepository = new PrismaNotificationRepository();
  const createSkinUseCase = new UpdateConfirmTransactionUseCase(
    transactionRepository,
    perfilRepository,
    walletRepository,
    notificationsRepository,
    skinRepository
  );
  return createSkinUseCase;
}
