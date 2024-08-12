import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { UpdateStatusTransactionRentalUseCase } from "@/useCases/TransactionRental/updateStatusTransactionRentalUseCase";

export function makeUpdateStatusTransactionRentalUseCase() {
  const prismaRentalTransactionRepository =
    new PrismaRentalTransactionRepository();

  const updateTransactionRental = new UpdateStatusTransactionRentalUseCase(
    prismaRentalTransactionRepository
  );
  return updateTransactionRental;
}
