import { FastifyRequest, FastifyReply } from "fastify";
import SteamCommunity from "steamcommunity";
const community = new SteamCommunity();

export function getInventoryController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };
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
      } else {
        return reply.send(inventory);
      }
    }
  );
}
