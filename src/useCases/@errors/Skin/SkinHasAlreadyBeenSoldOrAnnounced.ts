export class SkinHasAlreadyBeenSoldOrAnnounced extends Error {
  constructor() {
    super("Essa skin já foi anunciada.");
  }
}
