export class SkinHasAlreadyBeenSoldError extends Error {
  constructor(customer?: string) {
    super("Skin Has Already Been Sold | " + customer);
  }
}
