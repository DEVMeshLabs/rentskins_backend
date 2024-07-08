import { PrismaTransactionHistoryRepository } from "@/repositories/Prisma/prismaTransactionHistory";
import { GetByIdTransactionHistoryTransUseCase } from "@/useCases/TransactionHistory/getByIdTransactionHistoryTransUseCase";

export function makeGetByIdTransactionHistoryTransUseCase() {
  const transactionRepository = new PrismaTransactionHistoryRepository();
  const allTransactionHistory = new GetByIdTransactionHistoryTransUseCase(
    transactionRepository
  );
  return allTransactionHistory;
}
