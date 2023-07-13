export class NotificationAlreadyExistError extends Error {
  constructor() {
    super("Notification Already Exists");
  }
}
