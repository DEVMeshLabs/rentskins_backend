import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { GetManyUserTransactionRentalUseCase } from "@/useCases/TransactionRental/getManyUserTransactionRentUseCase";

export function makeGetManyUserTransactionRental() {
  const prismaRentalTransactionRepository =
    new PrismaRentalTransactionRepository();

  const getManyRentalTransaction = new GetManyUserTransactionRentalUseCase(
    prismaRentalTransactionRepository
  );
  return getManyRentalTransaction;
}
