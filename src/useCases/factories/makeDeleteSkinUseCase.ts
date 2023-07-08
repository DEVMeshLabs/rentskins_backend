import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { DeleteSkinUseCase } from "../deleteSkinUseCase";

export function makeDeleteSkinUseCase() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const getskinUseCase = new DeleteSkinUseCase(prismaSkinRepository);

  return getskinUseCase;
}
