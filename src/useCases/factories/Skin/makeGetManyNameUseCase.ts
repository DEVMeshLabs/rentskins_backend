import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { GetManyNameUseCase } from "@/useCases/Skin/getManyNameUseCase";

export function makeGetManyNameUseCase() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const getManyName = new GetManyNameUseCase(prismaSkinRepository);

  return getManyName;
}
