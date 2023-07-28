import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { DeleteSkinUseCase } from "@/useCases/Skin/deleteSkinUseCase";

export function makeDeleteSkinUseCase() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const getskinUseCase = new DeleteSkinUseCase(prismaSkinRepository);

  return getskinUseCase;
}
