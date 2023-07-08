import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { GetSkinManyUseCase } from "../getSkinManyUseCase";

export function makeGetSkinMany() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const getskinUseCase = new GetSkinManyUseCase(prismaSkinRepository);

  return getskinUseCase;
}
