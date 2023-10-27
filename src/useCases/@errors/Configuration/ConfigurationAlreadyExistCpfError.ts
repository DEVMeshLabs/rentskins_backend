export class ConfigurationAlreadyExistCpfError extends Error {
  constructor() {
    super("CPF já cadastrado no sistema.");
  }
}
