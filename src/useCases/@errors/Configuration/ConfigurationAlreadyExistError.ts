export class ConfigurationAlreadyExistError extends Error {
  constructor() {
    super("Configuration Already Exists");
  }
}
