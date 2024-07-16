import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { GetManyRentalTransactionUseCase } from "@/useCases/RentalTransaction/getManyRentalTransactionUseCase";

export function makeGetManyRentalTransaction() {
  const prismaRentalTransactionRepository =
    new PrismaRentalTransactionRepository();

  const getManyRentalTransaction = new GetManyRentalTransactionUseCase(
    prismaRentalTransactionRepository
  );
  return getManyRentalTransaction;
}
