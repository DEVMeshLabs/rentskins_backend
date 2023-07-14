import { PrismaCartRepository } from "@/repositories/Prisma/prismaCartRepository";
import { CreateCartUseCase } from "@/useCases/Cart/createCartUseCase";

export function makeCreateCartUseCase() {
  const prismaCartRepository = new PrismaCartRepository();
  const createCartUseCase = new CreateCartUseCase(prismaCartRepository);

  return createCartUseCase;
}
