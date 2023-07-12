export class WalletAlreadyExistError extends Error {
  constructor() {
    super("Wallet Already Exists");
  }
}
