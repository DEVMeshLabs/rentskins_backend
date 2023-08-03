import { csgo } from "@/server";
import { FastifyRequest, FastifyReply } from "fastify";

export function getFloatSkinController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };
  const { assetid, inspectLinks } = req.body as {
    inspectLinks: string;
    assetid: string;
  };
  if (csgo.haveGCSession) {
    const filteredID = inspectLinks.split("%D")[1];
    return csgo.inspectItem(id, assetid, filteredID, (item) => {
      return reply.send(item);
    });
  }
}
