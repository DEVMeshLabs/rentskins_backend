import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { GetManySearchUseCase } from "@/useCases/Skin/getManySearchUseCase";

export function makeGetManySearchUseCase() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const getManyName = new GetManySearchUseCase(prismaSkinRepository);

  return getManyName;
}
