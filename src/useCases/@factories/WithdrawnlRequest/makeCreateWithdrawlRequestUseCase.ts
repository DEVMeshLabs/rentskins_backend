import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { PrismaWithdrawalRequestRepository } from "@/repositories/Prisma/prismaWithdrawalRequestRepository";
import { CreateWithdrawalRequestUseCase } from "@/useCases/WithdrawalRequest/createWithdrawalRequestUseCase";

export function makeCreateWithdrawnlRequestUseCase() {
  const prismaWithdrawalRequestRepository =
    new PrismaWithdrawalRequestRepository();
  const prismaWalletRepository = new PrismaWalletRepository();
  const prismaNotificationRepository = new PrismaNotificationRepository();

  const createWalletUseCase = new CreateWithdrawalRequestUseCase(
    prismaWithdrawalRequestRepository,
    prismaWalletRepository,
    prismaNotificationRepository
  );

  return createWalletUseCase;
}
