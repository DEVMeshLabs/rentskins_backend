import { PagarMeProvider } from "@/useCases/Transaction/PagarMeProvider";

export function makeCreateTransactionUseCase() {
  const createSkinUseCase = new PagarMeProvider();

  return createSkinUseCase;
}
