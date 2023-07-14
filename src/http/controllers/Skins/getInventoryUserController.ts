import { DataPagination } from "@/utils/dataPagination";
import { FastifyRequest, FastifyReply } from "fastify";
import SteamCommunity from "steamcommunity";
const community = new SteamCommunity();

export function getInventoryController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };
  const { filterType, page, itemsPerPage } = req.body as {
    filterType: string[];
    page: number;
    itemsPerPage: number;
  };
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
        const filterInventory = inventory.filter((item) => {
          if (
            item.tags[0].name === "Container" ||
            item.tags[0].name === "Graffiti"
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
          return reply.send(DataPagination.execute(page, itemsPerPage, filter));
        }
      }
    }
  );
}
