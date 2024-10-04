export class SameUsersError extends Error {
  constructor() {
    super("Users have to be different");
  }
}
