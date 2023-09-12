import { CreateWebHookTransactionUseCase } from "@/useCases/Transaction/createWebHookTransaction";

export function makeCreateWebHookTransactionUseCase() {
  const createSkinUseCase = new CreateWebHookTransactionUseCase();
  return createSkinUseCase;
}
