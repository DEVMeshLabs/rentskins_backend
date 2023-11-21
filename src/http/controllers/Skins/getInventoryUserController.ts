import { FastifyRequest, FastifyReply } from "fastify";
import { community } from "@/server";

export function getInventoryUserController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };
  const { tudo } = req.query as { tudo: string };

  const isTrueOrFalse = tudo.toLowerCase() === "true";

  try {
    return community.getUserInventoryContents(
      id,
      730,
      2,
      isTrueOrFalse,
      "english",
      (err: Error | null, inventory?: any) => {
        if (err) {
          return reply.send({
            message: "Error",
            err,
          });
        }

        return reply.status(200).send(inventory);
      }
    );
  } catch (error) {
    return reply.status(500).send({
      message: "Error",
      err: error,
    });
  }
}
