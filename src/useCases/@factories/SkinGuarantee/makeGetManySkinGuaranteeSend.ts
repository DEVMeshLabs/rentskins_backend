import { PrismaSkinGuaranteeRepository } from "@/repositories/Prisma/prismaSkinGuaranteeRepository";
import { GetManySkinGuaranteeSendUseCase } from "@/useCases/SkinGuarantee/getManySkinGuaranteeSendUseCase";

export function makeGetManySkinGuaranteeSend() {
  const transactionRepository = new PrismaSkinGuaranteeRepository();
  const allTransactionHistory = new GetManySkinGuaranteeSendUseCase(
    transactionRepository
  );
  return allTransactionHistory;
}
