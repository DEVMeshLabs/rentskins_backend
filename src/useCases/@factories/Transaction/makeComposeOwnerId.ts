import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { ComposeOwner } from "@/useCases/Wallet/utils/composeOwner";

export function makeComposeOwnerId() {
  const transactionRepository = new PrismaTransactionRepository();
  const walletRepository = new PrismaWalletRepository();
  const perfilRepository = new PrismaPerfilRepository();
  const skinRepository = new PrismaSkinRepository();
  const notificationsRepository = new PrismaNotificationRepository();
  const createSkinUseCase = new ComposeOwner(
    skinRepository,
    walletRepository,
    notificationsRepository,
    perfilRepository,
    transactionRepository
  );
  return createSkinUseCase;
}
