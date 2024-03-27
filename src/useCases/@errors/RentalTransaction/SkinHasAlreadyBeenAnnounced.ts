export class SkinHasAlreadyBeenAnnounced extends Error {
  constructor() {
    super("Essa skin já foi anunciada.");
  }
}
