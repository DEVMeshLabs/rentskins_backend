import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { GetManyCategoryUseCase } from "../getManyCategoryUseCase";

export function makeGetManyCategory() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const getskinUseCase = new GetManyCategoryUseCase(prismaSkinRepository);

  return getskinUseCase;
}
