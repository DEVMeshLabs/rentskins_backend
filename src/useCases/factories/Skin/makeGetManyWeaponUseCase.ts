import { PrismaSkinRepository } from "@/repositories/Prisma/prismaSkinsRepository";
import { GetManyWeaponUseCase } from "@/useCases/Skin/getManyWeaponUseCase";

export function makeGetManyWeapon() {
  const prismaSkinRepository = new PrismaSkinRepository();
  const getskinUseCase = new GetManyWeaponUseCase(prismaSkinRepository);

  return getskinUseCase;
}
