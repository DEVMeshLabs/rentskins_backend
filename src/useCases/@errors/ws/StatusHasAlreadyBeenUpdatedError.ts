export class StatusHasAlreadyBeenUpdatedError extends Error {
  constructor() {
    super("Status has already been updated");
  }
}
