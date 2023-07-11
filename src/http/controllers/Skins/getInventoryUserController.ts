import { error } from "console";
import { FastifyRequest, FastifyReply } from "fastify";
import SteamCommunity from "steamcommunity";
const community = new SteamCommunity();

export async function getInventoryController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };
  return community.getUserInventoryContents(
    id,
    730,
    2,
    false,
    "english",
    (response: any) => {
      console.log(response);
      if (response === null) {
        return reply.status(500).send({
          error,
        });
      } else {
        return reply.status(200).send(response);
      }
    }
  );
}
