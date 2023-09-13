import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CreateWebHookTransactionUseCase } from "@/useCases/Transaction/createWebHookTransaction";

export function makeCreateWebHookTransactionUseCase() {
  const notificationRepository = new PrismaNotificationRepository();
  const walletRepository = new PrismaWalletRepository();
  const createSkinUseCase = new CreateWebHookTransactionUseCase(
    walletRepository,
    notificationRepository
  );
  return createSkinUseCase;
}
