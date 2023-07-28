export class CartAlreadyExistError extends Error {
  constructor() {
    super("Cart Already Exists");
  }
}
