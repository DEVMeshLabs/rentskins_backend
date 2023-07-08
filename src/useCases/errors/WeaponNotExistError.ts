export class WeaponNotExistError extends Error {
  constructor() {
    super("Weapon not Exists");
  }
}
