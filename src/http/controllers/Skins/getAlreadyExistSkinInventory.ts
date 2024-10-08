import { community } from "@/server";
import { FastifyRequest, FastifyReply } from "fastify";
import { ZodError, z } from "zod";

export function getAlreadyExistSkinInventory(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  const isAlreadyExistSchema = z.object({
    assetid: z.string(),
  });

  const { assetid } = isAlreadyExistSchema.parse(req.body);

  try {
    return community.getUserInventoryContents(
      id,
      730,
      2,
      true,
      "english",
      (err: Error | null, inventory?: any) => {
        if (err) {
          return reply.status(500).send({ error: err.message });
        }

        const isAlreadyExist = inventory.some(
          (item: any) => item.assetid === assetid
        );

        if (!isAlreadyExist) {
          reply
            .status(404)
            .send({ error: "Item isn't in the user's inventory" });
        }

        return reply.status(200).send({ message: "Item available" });
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error });
    }
    return reply.status(500).send({ error: error.message });
  }
}
