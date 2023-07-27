import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { PagarMeProvider } from "@/useCases/Transaction/PagarMeProvider";
import { CreateTransactionUseCase } from "@/useCases/Transaction/createTransactionUseCase";

export function makeCreateTransactionUseCase() {
  const prismaSkinRepository = new PrismaTransactionRepository();
  const paymentProvider = new PagarMeProvider();
  const createSkinUseCase = new CreateTransactionUseCase(
    prismaSkinRepository,
    paymentProvider
  );

  return createSkinUseCase;
}
