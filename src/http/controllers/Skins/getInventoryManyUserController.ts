import { community } from "@/server";
import { DataPagination } from "@/utils/dataPagination";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export function getInventoryManyUserController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  const inventorySchema = z.object({
    filterType: z.string().array(),
    page: z.number(),
    itemsPerPage: z.number(),
  });

  const { filterType, itemsPerPage, page } = inventorySchema.parse(req.body);
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
          const filterInventory = inventory.filter((item: any) => {
            if (
              item.tags[0].name === "Container" ||
              item.tags[0].name === "Collectible" ||
              item.tags[0].name === "Pass" ||
              item.tags[0].name === "Patch"
            ) {
              return false;
            }
            return true;
          });
          if (filterType.length === 0) {
            return reply.send(
              DataPagination.execute(page, itemsPerPage, filterInventory)
            );
          } else {
            const filter = filterInventory.filter((item) => {
              if (!filterType.includes(item.tags[0].name)) {
                return false;
              }
              return true;
            });
            return reply.send(
              DataPagination.execute(page, itemsPerPage, filter)
            );
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
