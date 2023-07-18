import { PrismaCartRepository } from "@/repositories/Prisma/prismaCartRepository";
import { GetCartUseCase } from "@/useCases/Cart/getCartUseCase";

export function makeGetCartUseCase() {
  const prismaCartRepository = new PrismaCartRepository();
  const getCartUseCase = new GetCartUseCase(prismaCartRepository);

  return getCartUseCase;
}
