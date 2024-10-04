import { PrismaTransactionHistoryRepository } from "@/repositories/Prisma/prismaTransactionHistory";
import { GetByIdTransactionHistoryUseCase } from "@/useCases/TransactionHistory/getByIdTransactionHistoryUseCase";

export function makeGetByIdTransactionHistoryTransUseCase() {
  const transactionRepository = new PrismaTransactionHistoryRepository();
  const allTransactionHistory = new GetByIdTransactionHistoryUseCase(
    transactionRepository
  );
  return allTransactionHistory;
}
