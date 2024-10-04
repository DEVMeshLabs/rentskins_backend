import { CreatePixTransactionUseCase } from "@/useCases/Transaction/createPixTransactionUseCase";

export function makeCreatePixTransactionUseCase() {
  const createPixCheckout = new CreatePixTransactionUseCase();
  return createPixCheckout;
}
