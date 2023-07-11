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
    (error, response) => {
      console.log(response);
      if (error) {
        return reply.send({
          message: "Error",
          error,
        });
      } else {
        return reply.send(response);
      }
    }
  );
}
