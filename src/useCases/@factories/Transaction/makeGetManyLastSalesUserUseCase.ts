import { PrismaTransactionRepository } from "@/repositories/Prisma/prismaTransactionRepository";
import { GetManyLastSalesUser } from "@/useCases/Transaction/getManyLastSalesUser";

export function makeGetManyLastSalesUserUseCase() {
  const transactionRepository = new PrismaTransactionRepository();
  const getManySales = new GetManyLastSalesUser(transactionRepository);
  return getManySales;
}
