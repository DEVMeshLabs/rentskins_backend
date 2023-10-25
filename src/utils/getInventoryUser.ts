import { community } from "@/server";

export async function getInventoryUser(owner_id: string) {
  return community.getUserInventoryContents(
    owner_id,
    730,
    2,
    true,
    "english",
    (err: Error | null, inventory?: any) => {
      if (err) {
        throw new Error(err.message);
      }

      return inventory;
    }
  ).cat;
}
