import { PrismaTransactionHistoryRepository } from "@/repositories/Prisma/prismaTransactionHistory";
import { GetByTransactionIdHistoryUseCase } from "@/useCases/TransactionHistory/getByTransactionIdHistoryUseCase";

export function makeGetByTransactionIdHistoryUseCase() {
  const transactionRepository = new PrismaTransactionHistoryRepository();
  const allTransactionHistory = new GetByTransactionIdHistoryUseCase(
    transactionRepository
  );
  return allTransactionHistory;
}
