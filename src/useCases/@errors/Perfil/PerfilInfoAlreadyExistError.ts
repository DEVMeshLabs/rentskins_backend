export class PerfilAlreadyExistError extends Error {
  constructor() {
    super("Perfil Already Exists");
  }
}
