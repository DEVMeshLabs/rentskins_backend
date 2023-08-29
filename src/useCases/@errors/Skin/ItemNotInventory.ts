export class ItemNotInventory extends Error {
  constructor() {
    super("The item is not in the user's inventory");
  }
}
