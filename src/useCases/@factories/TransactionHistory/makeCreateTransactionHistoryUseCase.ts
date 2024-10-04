import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { PrismaTransactionHistoryRepository } from "@/repositories/Prisma/prismaTransactionHistory";
import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { CreateTransactionHistoryUseCase } from "@/useCases/TransactionHistory/createTransactionHistoryUseCase";

export function makeCreateTransactionHistoryUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const transactionHistoryRepository = new PrismaTransactionHistoryRepository();
  const rentalTransactionRepository = new PrismaRentalTransactionRepository();
  const createTransaction = new CreateTransactionHistoryUseCase(
    transactionHistoryRepository,
    transactionRepository,
    rentalTransactionRepository
  );
  return createTransaction;
}
