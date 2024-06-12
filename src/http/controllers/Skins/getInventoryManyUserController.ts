import { community } from "@/server";
import { makeGetManySellerUseCase } from "@/useCases/@factories/Skin/makeGetManySellerUseCase";
import { makeGetManyTransactionUseCase } from "@/useCases/@factories/Transaction/makeGetManyTransactionUseCase";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function getInventoryManyUserController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };

  const inventorySchema = z.object({
    filterType: z.string().array(),
  });

  // const { filterType } = inventorySchema.parse(req.body);
  try {
    const makeSkins = makeGetManySellerUseCase();
    const skinsMany = await makeSkins.execute(id, "false");
    const transactionMany = makeGetManyTransactionUseCase();
    const transactions = await transactionMany.execute();

    if (!skinsMany) {
      return reply.status(404).send({
        message: "Error",
        err: "Skins not found",
      });
    }
    const baseUrl = `https://www.steamwebapi.com/steam/api/inventory?key=${process.env.KEY_STEAM_WEB_API}&steam_id=${id}`;

    const getInventory = await fetch(baseUrl).then((res) => res.json());

    if (getInventory.length > 0) {
      const skinsManySet = new Set(
        skinsMany.skins.map((skin) => skin.asset_id)
      );
      // Verificar em transactions
      const transactionsSet = new Set(
        transactions.map((transaction: any) => transaction.skin.asset_id)
      );

      const filterInventorySkins = getInventory.filter(
        (item) =>
          !skinsManySet.has(item.assetid) || !transactionsSet.has(item.assetid)
      );
      console.log(filterInventorySkins);

      return reply.status(200).send(filterInventorySkins);
    }

    // return community.getUserInventoryContents(
    //   id,
    //   730,
    //   2,
    //   true,
    //   "english",
    //   (err: Error | null, inventory?: any) => {
    //     if (err) {
    //       return reply.send({
    //         message: "Error",
    //         err,
    //       });
    //     } else {
    //       if (filterType.length === 0) {
    //         const filterInventory = inventory.filter(
    //           (item) => item.tags[0].name !== "Graffiti"
    //         );
    //         return reply.send(filterInventory);
    //       } else {
    //         const filter = inventory.filter((item) => {
    //           if (!filterType.includes(item.tags[0].name)) {
    //             return false;
    //           }
    //           return item.tags[0].name !== "Graffiti";
    //         });
    //         return reply.send(filter);
    //       }
    //     }
    //   }
    // );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: "Erro de validação", errors: error.errors });
    }
    return reply.status(500).send({ error: error.message });
  }
}
