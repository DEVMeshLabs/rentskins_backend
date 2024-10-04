export class VerifyAccountVacBanError extends Error {
  constructor() {
    super("Você não pode se cadastrar porque sua conta está banida pelo VAC.");
  }
}
