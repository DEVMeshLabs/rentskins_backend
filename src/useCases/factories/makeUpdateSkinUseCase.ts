import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { UpdateSkinUseCase } from "../updateSkinUseCase";

export function makeUpdateSkinUseCase() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const updateSkinUseCase = new UpdateSkinUseCase(prismaSkinRepository);

  return updateSkinUseCase;
}
