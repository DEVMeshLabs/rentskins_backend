import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { GetByUserTransactionUseCase } from "@/useCases/Transaction/getByUserTransactionUseCase";

export function makeGetUserTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const createSkinUseCase = new GetByUserTransactionUseCase(
    transactionRepository
  );
  return createSkinUseCase;
}
