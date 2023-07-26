export class CreateTransactionError extends Error {
  constructor() {
    super("Cart was not found");
  }
}
