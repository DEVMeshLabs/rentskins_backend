import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { GetManyTransactionRentalUseCase } from "@/useCases/TransactionRental/getManyTransactionRentalUseCase";

export function makeGetManyTransactionRental() {
  const prismaRentalTransactionRepository =
    new PrismaRentalTransactionRepository();

  const getManyRentalTransaction = new GetManyTransactionRentalUseCase(
    prismaRentalTransactionRepository
  );
  return getManyRentalTransaction;
}
