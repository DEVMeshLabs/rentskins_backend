export class PerfilInfoAlreadyExistError extends Error {
  constructor() {
    super("Perfil Already Exists");
  }
}
