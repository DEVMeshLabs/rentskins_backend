import { PrismaSkinGuaranteeRepository } from "@/repositories/Prisma/prismaSkinGuaranteeRepository";
import { GetManyAssetsSkinGuaranteeUseCase } from "@/useCases/SkinGuarantee/getManyAssetsSkinGuaranteeUseCase";

export function makeGetManyAssetsSkinGuarantee() {
  const transactionRepository = new PrismaSkinGuaranteeRepository();
  const allSkins = new GetManyAssetsSkinGuaranteeUseCase(transactionRepository);
  return allSkins;
}
