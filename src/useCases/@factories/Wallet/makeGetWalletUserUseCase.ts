import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { GetWalletUserUseCase } from "@/useCases/Wallet/getWalletUserUseCase";

export function makeGetWalletUserUseCase() {
  const prismaWalletRepository = new PrismaWalletRepository();
  const getWalletUserUseCase = new GetWalletUserUseCase(prismaWalletRepository);

  return getWalletUserUseCase;
}
