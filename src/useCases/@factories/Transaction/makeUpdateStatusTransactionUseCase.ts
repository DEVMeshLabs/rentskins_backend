import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { UpdateStatusTransactionUseCase } from "@/useCases/Transaction/updateStatusTransactionUseCase";

export function makeUpdateStatusTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const createSkinUseCase = new UpdateStatusTransactionUseCase(
    transactionRepository
  );
  return createSkinUseCase;
}
