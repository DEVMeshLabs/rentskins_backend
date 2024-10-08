export class HasAlreadyBeenUpdated extends Error {
  constructor() {
    super("Has already been updated");
  }
}
