import { TransactionHistoryNotExistError } from "@/useCases/@errors/TransactionHistory/TransactionHistoryNotExistError";
import { StatusHasAlreadyBeenUpdatedError } from "@/useCases/@errors/ws/StatusHasAlreadyBeenUpdatedError";
import { makeGetSkinUseCase } from "@/useCases/@factories/Skin/makeGetSkinUseCase";
import { makeGetIdTransactionUseCase } from "@/useCases/@factories/Transaction/makeGetIdTransactionUseCase";
import { makeUpdateStatusTransactionUseCase } from "@/useCases/@factories/Transaction/makeUpdateStatusTransactionUseCase";
import { Myitem, Tradeoffer } from "@/useCases/ws/interface/getTradesPending";
import { FastifyRequest, FastifyReply } from "fastify";

export async function validateTradesPendingController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void | String> {
  const { transactionId } = req.params as { transactionId: string };
  const body = req.body as any;

  try {
    const makeTransaction = makeGetIdTransactionUseCase();
    const makeUpdate = makeUpdateStatusTransactionUseCase();
    const makeSkin = makeGetSkinUseCase();

    const transaction = await makeTransaction.execute(transactionId);

    const skin = await makeSkin.execute(transaction.skin_id);

    if (!transaction) {
      throw new TransactionHistoryNotExistError();
    } else if (transaction.status === "NegotiationSend") {
      throw new StatusHasAlreadyBeenUpdatedError();
    }
    const tradeoffers = body.payload.tradeoffers;

    if (transaction.status === "InProgress") {
      const filterSkin = tradeoffers.filter(
        (item: Tradeoffer) => item.participantsteamid === transaction.buyer_id
      );

      if (filterSkin.length > 0) {
        const filterItem = filterSkin.filter((item: Tradeoffer) => {
          return item.myitems.filter((item: Myitem) => {
            return (
              item.market_hash_name === skin.skin_market_hash_name &&
              item.instanceid === skin.skin_instanceid &&
              item.classid === skin.skin_classid
            );
          });
        });

        if (filterItem.length > 0) {
          const response = await makeUpdate.execute(
            transactionId,
            "NegotiationSend"
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
