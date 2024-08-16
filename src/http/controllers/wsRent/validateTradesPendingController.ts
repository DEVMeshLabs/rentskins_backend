import { TransactionNotExistError } from "@/useCases/@errors/Transaction/TransactionNotExistError";
import { StatusHasAlreadyBeenUpdatedError } from "@/useCases/@errors/ws/StatusHasAlreadyBeenUpdatedError";
import { makeCreateNotificationUseCase } from "@/useCases/@factories/Notification/makeCreateNotificationUseCase";
import { makeGetTransactionRent } from "@/useCases/@factories/RentalTransaction/makeGetRentalTransaction";
import { makeUpdateStatusTransactionRentalUseCase } from "@/useCases/@factories/RentalTransaction/makeUpdateStatusTransactionRentalUseCase";
import {
  Tradeoffer,
  type Participantitem,
} from "@/useCases/ws/interface/getTradesPending";
import { FastifyRequest, FastifyReply } from "fastify";

export async function rentValidateTradesPendingController(
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

    if (transactionRent.status === "TrialPeriodStarted") {
      throw new StatusHasAlreadyBeenUpdatedError();
    }

    if (transactionRent.status === "WaitingForBuyerConfirmation") {
      const filteredSkins = tradeoffers.filter(
        (offer: Tradeoffer) =>
          offer.participantsteamid ===
          (transactionRent as any).skinsRent[0].seller_id
      );
      console.log("filteredSkins", filteredSkins);
      if (filteredSkins.length > 0) {
        console.log("Caiu no if");
        // Preciso verificar se todos os itens de participantims estão em skinsRent
        const matchingItems = filteredSkins.some((offer: Tradeoffer) =>
          (transactionRent as any).skinsRent.every((skin) => {
            console.log("Skin", skin);
            return offer.participantitems.some((item: Participantitem) => {
              console.log("Item", item);
              return (
                item.market_hash_name === skin.skin_market_hash_name &&
                item.instanceid === skin.skin_instanceid &&
                item.classid === skin.skin_classid
              );
            });
          })
        );
        console.log("MatchItems", matchingItems);
        if (matchingItems) {
          const response =
            await makeUpdateStatusTransactionRentalUseCase().execute(
              transactionId,
              "WaitingForSellerConfirmation"
            );

          const createNotification = makeCreateNotificationUseCase();
          await createNotification.execute({
            owner_id: transactionRent.buyerId,
            description:
              "A skin(s) foi confirmada, aguarde a confirmação do vendedor.",
          });

          await Promise.all(
            (transactionRent as any).skinsRent.map((skin) =>
              createNotification.execute({
                owner_id: skin.seller_id,
                description:
                  "Locatário confirmou a skin(s), está aguardando sua confirmação.",
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
