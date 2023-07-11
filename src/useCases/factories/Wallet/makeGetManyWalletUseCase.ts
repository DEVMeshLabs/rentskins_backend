import { PrismaWalletRepository } from "@/repositories/Prisma/prismaWalletRepository";
import { GetManyWalletUseCase } from "@/useCases/Wallet/getManyWalletUseCase";

export function makeGetManyWalletUseCase() {
  const prismaWalletRepository = new PrismaWalletRepository();
  const getManyWalletUseCase = new GetManyWalletUseCase(prismaWalletRepository);

  return getManyWalletUseCase;
}
