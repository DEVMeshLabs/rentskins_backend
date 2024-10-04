import { PrismaWithdrawalRequestRepository } from "@/repositories/Prisma/prismaWithdrawalRequestRepository";
import { GetManyWithdrawnlRequestUseCase } from "@/useCases/WithdrawalRequest/getManyWithdrawnlRequestUseCase";

export function makeCreateWithdrawnlRequestUseCase() {
  const prismaWithdrawalRequestRepository =
    new PrismaWithdrawalRequestRepository();

  const createWalletUseCase = new GetManyWithdrawnlRequestUseCase(
    prismaWithdrawalRequestRepository
  );

  return createWalletUseCase;
}
