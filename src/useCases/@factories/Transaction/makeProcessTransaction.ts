import { PrismaConfigurationRepository } from "@/repositories/Prisma/prismaConfigurationRepository";
import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { ProcessTransaction } from "@/utils/processTransaction";

export function makeProcessTransaction() {
  const transactionRepository = new PrismaTransactionRepository();
  const configurationRepository = new PrismaConfigurationRepository();
  const prossTransaction = new ProcessTransaction(
    transactionRepository,
    configurationRepository
  );
  return prossTransaction;
}
