import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { GetTransactionRentUseCase } from "@/useCases/TransactionRental/getTransactionRentUseCase";

export function makeGetTransactionRent() {
  const prismaRentalTransactionRepository =
    new PrismaRentalTransactionRepository();

  const getTransactionRentUseCase = new GetTransactionRentUseCase(
    prismaRentalTransactionRepository
  );
  return getTransactionRentUseCase;
}
