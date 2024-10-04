import { PrismaTransactionHistoryRepository } from "@/repositories/Prisma/prismaTransactionHistory";
import { GetManyTransactionHistoryUseCase } from "@/useCases/TransactionHistory/getManyTransactionHistoryUseCase";

export function makeGetManyTransactionHistoryUseCase() {
  const transactionRepository = new PrismaTransactionHistoryRepository();
  const allTransactionHistory = new GetManyTransactionHistoryUseCase(
    transactionRepository
  );
  return allTransactionHistory;
}
