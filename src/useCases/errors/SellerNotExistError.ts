export class SellerNotExistError extends Error {
  constructor() {
    super("Seller_id not Exists");
  }
}
