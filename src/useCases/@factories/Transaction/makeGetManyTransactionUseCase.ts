import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { GetManyTransactionUseCase } from "@/useCases/Transaction/getManyTransactionUseCase";

export function makeGetManyTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const createSkinUseCase = new GetManyTransactionUseCase(
    transactionRepository
  );
  return createSkinUseCase;
}
