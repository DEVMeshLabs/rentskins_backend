export class WalletNotExistsError extends Error {
  constructor() {
    super("Wallet not Exists");
  }
}
