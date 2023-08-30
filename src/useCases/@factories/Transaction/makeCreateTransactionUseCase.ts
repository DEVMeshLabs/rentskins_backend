import { TransactionUseCase } from "@/useCases/Transaction/transactionUseCase";

export function makeCreateTransactionUseCase() {
  const createSkinUseCase = new TransactionUseCase();
  return createSkinUseCase;
}
