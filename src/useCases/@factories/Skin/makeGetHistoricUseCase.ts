import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { GetHistoricSellerUseCase } from "@/useCases/Skin/getHistoricSellerUseCase";

export function makeGetHistoricUseCase() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const getskinUseCase = new GetHistoricSellerUseCase(prismaSkinRepository);

  return getskinUseCase;
}
