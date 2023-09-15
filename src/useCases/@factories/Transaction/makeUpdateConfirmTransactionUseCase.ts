import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { UpdateConfirmTransactionUseCase } from "@/useCases/Transaction/UpdateConfirmTransactionUseCase";

export function makeUpdateConfirmTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const createSkinUseCase = new UpdateConfirmTransactionUseCase(
    transactionRepository
  );
  return createSkinUseCase;
}
