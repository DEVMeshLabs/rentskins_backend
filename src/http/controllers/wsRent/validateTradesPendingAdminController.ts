import { TransactionNotExistError } from "@/useCases/@errors/Transaction/TransactionNotExistError";
import { StatusHasAlreadyBeenUpdatedError } from "@/useCases/@errors/ws/StatusHasAlreadyBeenUpdatedError";
import { makeCreateNotificationUseCase } from "@/useCases/@factories/Notification/makeCreateNotificationUseCase";
import { makeGetTransactionRent } from "@/useCases/@factories/RentalTransaction/makeGetRentalTransaction";
import { makeUpdateStatusTransactionRentalUseCase } from "@/useCases/@factories/RentalTransaction/makeUpdateStatusTransactionRentalUseCase";
import { Myitem, Tradeoffer } from "@/useCases/ws/interface/getTradesPending";
import { FastifyRequest, FastifyReply } from "fastify";

export async function rentValidateTradesPendingAdminController(
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

    if (
      transactionRent.status === "WaitingForAdministratorsReturnConfirmation"
    ) {
      throw new StatusHasAlreadyBeenUpdatedError();
    }

    if (transactionRent.status === "WaitingForBuyerReturnConfirm") {
      const rentId = "76561198862407248";

      const filteredSkins = tradeoffers.filter(
        (offer: Tradeoffer) => offer.participantsteamid === rentId
      );

      console.log(filteredSkins);

      if (filteredSkins.length > 0) {
        console.log(
          "Verifica se encontrou itens correspondentes ao participante"
        );
        const matchingItems = filteredSkins.some((offer: Tradeoffer) =>
          offer.myitems.every((item: Myitem) =>
            (transactionRent as any).skinsRent.some(
              (skinRent) =>
                item.market_hash_name === skinRent.skin_market_hash_name &&
                item.instanceid === skinRent.skin_instanceid &&
                item.classid === skinRent.skin_classid
            )
          )
        );

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
