import { PrismaCartRepository } from "@/repositories/Prisma/prismaCartRepository";
import { DeleteCartUseCase } from "@/useCases/Cart/deleteCartUseCase";

export function makeDeleteCartUseCase() {
  const prismaCartRepository = new PrismaCartRepository();
  const deleteCartUseCase = new DeleteCartUseCase(prismaCartRepository);

  return deleteCartUseCase;
}
