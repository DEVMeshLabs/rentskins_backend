import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { GetTransactionRentUserUseCase } from "@/useCases/TransactionRental/getTransactionRentUserUseCase";

export function makeGetTransactionRentuserUseCase() {
  const prismaRentalTransactionRepository =
    new PrismaRentalTransactionRepository();

  const getManyRentalTransactionUser = new GetTransactionRentUserUseCase(
    prismaRentalTransactionRepository
  );
  return getManyRentalTransactionUser;
}
