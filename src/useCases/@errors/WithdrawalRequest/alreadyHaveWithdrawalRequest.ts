export class AlreadyHaveWithdrawalRequest extends Error {
  constructor() {
    super("Already have withdrawal request");
  }
}
