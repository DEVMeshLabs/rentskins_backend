export class PerfilNotExistError extends Error {
  constructor() {
    super("Perfil not Exists");
  }
}
