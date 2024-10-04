export class TransactionHistoryNotExistError extends Error {
  constructor() {
    super("Transaction history not Exists");
  }
}
