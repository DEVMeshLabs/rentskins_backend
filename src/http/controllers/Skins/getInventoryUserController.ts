import { FastifyRequest, FastifyReply } from "fastify";
import { community } from "@/server";
import { makeGetManySellerUseCase } from "@/useCases/@factories/Skin/makeGetManySellerUseCase";
import { makeGetManyTransactionUseCase } from "@/useCases/@factories/Transaction/makeGetManyTransactionUseCase";

export async function getInventoryUserController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: string };
  const { tradableOnly } = req.query as { tradableOnly: string };

  let isTrueOrFalse: boolean;

  if (!tradableOnly) {
    isTrueOrFalse = false;
  } else if (tradableOnly.toLowerCase() === "true") {
    isTrueOrFalse = true;
  }

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

        if (inventory.length > 0) {
          const skinsManySet = new Set(
            skinsMany.skins.map((skin) => skin.asset_id)
          );
          // Verificar em transactions
          const transactionsSet = new Set(
            transactions.map((transaction: any) => transaction.skin.asset_id)
          );

          const filterInventorySkins = inventory.filter(
            (item) =>
              !skinsManySet.has(item.assetid) &&
              !transactionsSet.has(item.assetid)
          );
          console.log(filterInventorySkins);
          return reply.status(200).send(filterInventorySkins);
        }
      }
    );
  } catch (error) {
    return reply.status(500).send({
      message: "Error",
      err: error,
    });
  }
}
