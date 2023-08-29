import { community } from "@/server";

export async function getInventory(id: string, assetid: string) {
  return community.getUserInventoryContents(
    id,
    730,
    2,
    true,
    "english",
    (err: Error | null, inventory?: any) => {
      if (err) {
        throw new Error();
      }
      const filterInventory = inventory.filter((item: any) => {
        if (
          item.tags[0].name === "Container" ||
          item.tags[0].name === "Graffiti" ||
          item.tags[0].name === "Collectible" ||
          item.tags[0].name === "Pass" ||
          item.tags[0].name === "Patch"
        ) {
          return false;
        }
        return true;
      });

      const isAlreadyExist = filterInventory.filter(
        (item: any) => item.assetid === assetid
      );

      return isAlreadyExist;
    }
  );
}
