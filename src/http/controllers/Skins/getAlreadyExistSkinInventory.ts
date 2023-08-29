import { community } from "@/server";
import { FastifyRequest, FastifyReply } from "fastify";

export function getAlreadyExistSkinInventory(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };
  const { assetid } = req.body as { assetid: string };

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

      const isAlreadyExist = filterInventory.some(
        (item: any) => item.assetid === assetid
      );

      if (!isAlreadyExist) {
        reply.status(404).send({ error: "Item isn't in the user's inventory" });
      }

      return reply.status(200).send({ message: "Item available" });
    }
  );
}
