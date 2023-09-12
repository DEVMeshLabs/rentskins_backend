import { PrismaPerfilRepository } from "@/repositories/Prisma/prismaPerfilRepository";
import { TransactionUseCase } from "@/useCases/Transaction/transactionUseCase";

export function makeCreateTransactionUseCase() {
  const perfilRepository = new PrismaPerfilRepository();
  const createSkinUseCase = new TransactionUseCase(perfilRepository);
  return createSkinUseCase;
}
