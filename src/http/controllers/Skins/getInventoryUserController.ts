import { FastifyRequest, FastifyReply } from "fastify";
import SteamCommunity from "steamcommunity";
import { z } from "zod";
const community = new SteamCommunity();

export function getInventoryUserController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  try {
    return community.getUserInventoryContents(
      id,
      730,
      2,
      true,
      "english",
      (err: Error | null, inventory?: any) => {
        if (err) {
          return reply.send({
            message: "Error",
            err,
          });
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
        return reply.status(200).send(filterInventory);
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: "Erro de validação", errors: error.errors });
    }
    throw error;
  }
}
