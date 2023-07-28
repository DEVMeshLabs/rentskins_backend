import { PrismaCartRepository } from "@/repositories/Prisma/prismaCartRepository";
import { GetCartBuyerUseCase } from "@/useCases/Cart/getCartBuyerUseCase";

export function makeGetCartBuyerUseCase() {
  const prismaCartRepository = new PrismaCartRepository();
  const getCartUseCase = new GetCartBuyerUseCase(prismaCartRepository);

  return getCartUseCase;
}
