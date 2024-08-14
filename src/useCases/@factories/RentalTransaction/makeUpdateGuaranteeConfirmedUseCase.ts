import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { UpdateGuaranteeConfirmedUseCase } from "@/useCases/TransactionRental/updateGuaranteeConfirmedUseCase";

export function makeUpdateGuaranteeConfirmedUseCase() {
  const prismaRentalTransactionRepository =
    new PrismaRentalTransactionRepository();
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const updateTransactionRental = new UpdateGuaranteeConfirmedUseCase(
    prismaRentalTransactionRepository,
    prismaNotificationRepository
  );
  return updateTransactionRental;
}
