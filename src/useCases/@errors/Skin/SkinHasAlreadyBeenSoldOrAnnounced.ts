export class SkinHasAlreadyBeenSoldOrAnnounced extends Error {
  public id: string;
  public asset_id: string;
  constructor(message?: string, id?: string, asset_id?: string) {
    super(`O item ${message !== undefined ? message : ""} já foi anunciado.`);
    this.asset_id = asset_id;
    this.id = id;
  }
}
