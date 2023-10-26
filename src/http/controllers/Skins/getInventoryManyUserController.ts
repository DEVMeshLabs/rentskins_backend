import { community } from "@/server";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export function getInventoryManyUserController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  const inventorySchema = z.object({
    filterType: z.string().array(),
  });

  const { filterType } = inventorySchema.parse(req.body);
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
        } else {
          if (filterType.length === 0) {
            const filterInventory = inventory.filter(
              (item) => item.tags[0].name !== "Graffiti"
            );
            return reply.send(filterInventory);
          } else {
            const filter = inventory.filter((item) => {
              if (!filterType.includes(item.tags[0].name)) {
                return false;
              }

              return item.tags[0].name !== "Graffiti";
            });
            return reply.send(filter);
          }
        }
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
