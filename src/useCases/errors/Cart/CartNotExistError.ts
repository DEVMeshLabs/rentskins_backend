export class CartNotExistError extends Error {
  constructor() {
    super("Cart not Exist");
  }
}
