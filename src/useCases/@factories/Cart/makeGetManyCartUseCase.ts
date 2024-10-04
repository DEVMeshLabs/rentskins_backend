import { PrismaCartRepository } from "@/repositories/Prisma/prismaCartRepository";
import { GetManyCartUseCase } from "@/useCases/Cart/getManyCartUseCase";

export function makeGetManyCart() {
  const prismaCartRepository = new PrismaCartRepository();
  const createCartUseCase = new GetManyCartUseCase(prismaCartRepository);

  return createCartUseCase;
}
