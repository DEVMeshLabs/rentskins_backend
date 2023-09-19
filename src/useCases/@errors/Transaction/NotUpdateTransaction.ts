export class NotUpdateTransaction extends Error {
  constructor() {
    super("Essa transaction já foi atualizada!");
  }
}
