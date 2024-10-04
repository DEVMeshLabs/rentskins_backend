import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { ValidateTradesPending } from "@/useCases/ws/validateTradesPending";

export function makeValidateTradesPendingUseCase() {
  const prismaTrasactionRepository = new PrismaTransactionRepository();
  const prismaSkinRepository = new PrismaSkinRepository();

  const validateTradesPeding = new ValidateTradesPending(
    prismaTrasactionRepository,
    prismaSkinRepository
  );

  return validateTradesPeding;
}
