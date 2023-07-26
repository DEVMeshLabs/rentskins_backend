import { PrismaCartRepository } from "@/repositories/Prisma/prismaCartRepository";
import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { CreateTransactionUseCase } from "@/useCases/Transaction/createTransactionUseCase";

export function makeCreateTransactionUseCase() {
  const prismaSkinRepository = new PrismaTransactionRepository();
  const cartRepositoryUseCase = new PrismaCartRepository();
  const createSkinUseCase = new CreateTransactionUseCase(
    prismaSkinRepository,
    cartRepositoryUseCase
  );

  return createSkinUseCase;
}
