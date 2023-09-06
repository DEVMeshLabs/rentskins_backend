import { GetRetriveTransactionUseCase } from "@/useCases/Transaction/getRetriveTransactionUseCase";

export function makeGetRetriveTransactionUseCase() {
  const createSkinUseCase = new GetRetriveTransactionUseCase();
  return createSkinUseCase;
}
