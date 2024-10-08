import { PrismaSkinGuaranteeRepository } from "@/repositories/Prisma/prismaSkinGuaranteeRepository";
import { UpdateByIdSkinGuaranteeUseCase } from "@/useCases/SkinGuarantee/updateByIdSkinGuaranteeUseCase";

export function makeUpdateByIdSkinGuarantee() {
  const transactionRepository = new PrismaSkinGuaranteeRepository();
  const update = new UpdateByIdSkinGuaranteeUseCase(transactionRepository);
  return update;
}
