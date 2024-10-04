import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { GetIdTransactionUseCase } from "@/useCases/Transaction/getIdTransactionUseCase";

export function makeGetIdTransactionUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const createSkinUseCase = new GetIdTransactionUseCase(transactionRepository);
  return createSkinUseCase;
}
