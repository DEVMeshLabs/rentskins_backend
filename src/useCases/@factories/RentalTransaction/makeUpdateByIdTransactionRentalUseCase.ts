import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { UpdateByIdTransactionRentalUseCase } from "@/useCases/TransactionRental/updateByIdTransactionRentalUseCase";

export function makeUpdateByIdTransactionRentalUseCase() {
  const prismaRentalTransactionRepository =
    new PrismaRentalTransactionRepository();

  const updateTransactionRental = new UpdateByIdTransactionRentalUseCase(
    prismaRentalTransactionRepository
  );
  return updateTransactionRental;
}
