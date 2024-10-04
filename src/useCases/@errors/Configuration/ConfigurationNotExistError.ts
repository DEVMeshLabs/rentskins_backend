export class ConfigurationNotExistError extends Error {
  constructor() {
    super("Por favor configure sua conta antes de listar um item!");
  }
}
