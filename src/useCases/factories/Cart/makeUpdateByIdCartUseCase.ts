import { PrismaCartRepository } from "@/repositories/Prisma/prismaCartRepository";
import { UpdateByIdCartUseCase } from "@/useCases/Cart/updateByIdUseCase";

export function makeUpdateByIdCartUseCase() {
  const prismaCartRepository = new PrismaCartRepository();
  const updateCart = new UpdateByIdCartUseCase(prismaCartRepository);

  return updateCart;
}
