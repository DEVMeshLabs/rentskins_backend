export class TransactionNotExistError extends Error {
  constructor() {
    super("Transaction not Exists");
  }
}
