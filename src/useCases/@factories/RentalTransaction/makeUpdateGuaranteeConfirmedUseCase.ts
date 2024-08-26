import { PrismaNotificationRepository } from "@/repositories/Prisma/prismaNotificationRepository";
import { PrismaRentalTransactionRepository } from "@/repositories/Prisma/prismaRentalTransactionRepository";
import { PrismaSkinGuaranteeRepository } from "@/repositories/Prisma/prismaSkinGuaranteeRepository";
import { UpdateGuaranteeConfirmedUseCase } from "@/useCases/TransactionRental/updateGuaranteeConfirmedUseCase";

export function makeUpdateGuaranteeConfirmedUseCase() {
  const prismaRentalTransactionRepository =
    new PrismaRentalTransactionRepository();
  const prismaNotificationRepository = new PrismaNotificationRepository();
  const prismaSkinGuaranteeRepository = new PrismaSkinGuaranteeRepository();
  const updateTransactionRental = new UpdateGuaranteeConfirmedUseCase(
    prismaRentalTransactionRepository,
    prismaNotificationRepository,
    prismaSkinGuaranteeRepository
  );
  return updateTransactionRental;
}
