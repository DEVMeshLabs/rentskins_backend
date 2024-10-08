export class SkinFloatNoCreditsError extends Error {
  constructor() {
    super("Não há mais créditos - steam web api");
  }
}
