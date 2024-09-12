import { TransactionNotExistError } from "@/useCases/@errors/Transaction/TransactionNotExistError";
import { StatusHasAlreadyBeenUpdatedError } from "@/useCases/@errors/ws/StatusHasAlreadyBeenUpdatedError";
import { makeCreateNotificationUseCase } from "@/useCases/@factories/Notification/makeCreateNotificationUseCase";
import { makeGetTransactionRent } from "@/useCases/@factories/RentalTransaction/makeGetRentalTransaction";
import { makeUpdateStatusTransactionRentalUseCase } from "@/useCases/@factories/RentalTransaction/makeUpdateStatusTransactionRentalUseCase";
import { Myitem, Tradeoffer } from "@/useCases/ws/interface/getTradesPending";
import { FastifyRequest, FastifyReply } from "fastify";

export async function rentValidateTradesPendingGaranteeController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void | string> {
  const { transactionId } = req.params as { transactionId: string };
  const {
    payload: { tradeoffers },
  } = req.body as any;

  try {
    const transactionRent = await makeGetTransactionRent().execute(
      transactionId
    );

    if (!transactionRent) {
      throw new TransactionNotExistError();
    }

    if (transactionRent.status === "WaitingForBuyerConfirmation") {
      throw new StatusHasAlreadyBeenUpdatedError();
    }

    if (transactionRent.status === "WaitingForReturn") {
      const filteredSkins = tradeoffers.filter(
        (offer: Tradeoffer) =>
          offer.participantsteamid ===
          (transactionRent as any).skinsRent[0].seller_id
      );

      if (filteredSkins.length > 0) {
        console.log(
          "Verifica se encontrou itens correspondentes ao participante"
        );
        const matchingItems = filteredSkins.some((offer: Tradeoffer) =>
          offer.myitems.every((item: Myitem) =>
            (transactionRent as any).skinsRent.some(
              (itemSkin) =>
                item.market_hash_name === itemSkin.skin_market_hash_name &&
                item.instanceid === itemSkin.skin_instanceid &&
                item.classid === itemSkin.skin_classid
            )
          )
        );
        console.log("Verificar o valor de matchingItems", matchingItems);
        if (matchingItems) {
          const response =
            await makeUpdateStatusTransactionRentalUseCase().execute(
              transactionId,
              "WaitingForAdministratorsReturnConfirmation"
            );

          const createNotification = makeCreateNotificationUseCase();
          await createNotification.execute({
            owner_id: transactionRent.buyerId,
            description:
              "O enviou da oferta foi confirmada, aguarde a confirmação dos administradores",
          });

          await Promise.all(
            (transactionRent as any).skinsRent.map((skin) =>
              createNotification.execute({
                owner_id: skin.seller_id,
                description:
                  "O enviou da oferta foi confirmada, aguarde a confirmação dos administradores",
              })
            )
          );

          return reply.status(200).send(response);
        }
      }

      return reply.status(404).send({ message: "Item not found" });
    }
  } catch (error) {
    if (error instanceof StatusHasAlreadyBeenUpdatedError) {
      return reply.status(409).send({
        message: error.message,
      });
    }

    return reply.status(500).send({
      message: "Error",
      err: error.message,
    });
  }
}
