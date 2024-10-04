export class CartNotFoundError extends Error {
  constructor() {
    super("Cart was not found");
  }
}
