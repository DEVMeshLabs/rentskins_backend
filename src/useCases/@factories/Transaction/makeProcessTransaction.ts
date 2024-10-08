import { makeCreateTransactionUseCase } from "./makeCreateTransactionUseCase";

export function makeProcessTransaction() {
  const makeTransaction = makeCreateTransactionUseCase();
  const prossTransaction = new ProcessTransaction(makeTransaction);
  return prossTransaction;
}
