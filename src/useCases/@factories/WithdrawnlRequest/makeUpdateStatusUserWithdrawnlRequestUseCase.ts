import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { PrismaWithdrawalRequestRepository } from "@/repositories/Prisma/prismaWithdrawalRequestRepository";
import { UpdateStatusUserWithdrawalRequestUseCase } from "@/useCases/WithdrawalRequest/updateStatusUserWithdrawnlRequest";

export function makeUpdateStatusUserWithdrawnlRequestUseCase() {
  const prismaWithdrawalRequestRepository =
    new PrismaWithdrawalRequestRepository();
  const prismaWalletRepository = new PrismaWalletRepository();
  const prismaNotificationRepository = new PrismaNotificationRepository();

  const createWalletUseCase = new UpdateStatusUserWithdrawalRequestUseCase(
    prismaWithdrawalRequestRepository,
    prismaWalletRepository,
    prismaNotificationRepository
  );

  return createWalletUseCase;
}
