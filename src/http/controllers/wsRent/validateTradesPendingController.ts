import { TransactionNotExistError } from "@/useCases/@errors/Transaction/TransactionNotExistError";
import { StatusHasAlreadyBeenUpdatedError } from "@/useCases/@errors/ws/StatusHasAlreadyBeenUpdatedError";
import { makeCreateNotificationUseCase } from "@/useCases/@factories/Notification/makeCreateNotificationUseCase";
import { makeGetTransactionRent } from "@/useCases/@factories/RentalTransaction/makeGetRentalTransaction";
import { makeUpdateByIdTransactionRentalUseCase } from "@/useCases/@factories/RentalTransaction/makeUpdateByIdTransactionRentalUseCase";
import {
  Tradeoffer,
  type Myitem,
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

      if (filteredSkins.length > 0) {
        console.log(
          "Verifica se encontrou itens correspondentes ao participante"
        );
        const matchingItems = filteredSkins.some((offer: Tradeoffer) =>
          offer.participantitems.every((item: Myitem) =>
            (transactionRent as any).skinsRent.some(
              (skinItem) =>
                item.market_hash_name === skinItem.skin_market_hash_name &&
                item.instanceid === skinItem.skin_instanceid &&
                item.classid === skinItem.skin_classid
            )
          )
        );

        if (matchingItems) {
          const response =
            await makeUpdateByIdTransactionRentalUseCase().execute(
              transactionId,
              {
                status: "WaitingForSellerConfirmation",
                buyerConfirmedAt: new Date(),
              }
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
