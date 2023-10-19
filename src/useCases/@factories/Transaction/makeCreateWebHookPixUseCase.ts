import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { CreateWebHookPixUseCase } from "@/useCases/Transaction/createWebHookPixUseCase";

export function makeCreateWebHookPixUseCase() {
  const prismaNotification = new PrismaNotificationRepository();
  const prismaWallet = new PrismaWalletRepository();
  const createPixCheckout = new CreateWebHookPixUseCase(
    prismaNotification,
    prismaWallet
  );
  return createPixCheckout;
}
