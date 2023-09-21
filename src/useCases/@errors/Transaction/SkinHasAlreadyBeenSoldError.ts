export class SkinHasAlreadyBeenSoldError extends Error {
  constructor() {
    super("Skin Has Already Been Sold");
  }
}
