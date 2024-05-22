import { TransactionHistoryNotExistError } from "@/useCases/@errors/TransactionHistory/TransactionHistoryNotExistError";
import { StatusHasAlreadyBeenUpdatedError } from "@/useCases/@errors/ws/StatusHasAlreadyBeenUpdatedError";
import { makeGetSkinUseCase } from "@/useCases/@factories/Skin/makeGetSkinUseCase";
import { makeGetIdTransactionUseCase } from "@/useCases/@factories/Transaction/makeGetIdTransactionUseCase";
import { Myitem, Tradeoffer } from "@/useCases/ws/interface/getTradesPending";
import { FastifyRequest, FastifyReply } from "fastify";

export async function validateTradesPendingController(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | void | String> {
  const { transactionId } = req.params as { transactionId: string };
  const body = req.body;
  console.log("Entrou validate Trades Pedding");
  try {
    const makeTransaction = makeGetIdTransactionUseCase();
    const makeSkin = makeGetSkinUseCase();
    console.log("ESSEEEE", body);
    console.log("Entrou no Use Case");
    const transaction = await makeTransaction.execute(transactionId);

    const skin = await makeSkin.execute(transaction.skin_id);

    if (!transaction) {
      throw new TransactionHistoryNotExistError();
    } else if (transaction.status === "NegotiationSend") {
      throw new StatusHasAlreadyBeenUpdatedError();
    }
    console.log("Passou daqui");
    const tradeoffers = body.payload.tradeoffers;

    console.log(
      "Validação:",
      tradeoffers[0].participantsteamid === transaction.buyer_id
    );
    if (transaction.status === "Default") {
      console.log("Entrou passo 1");

      const filterSkin = tradeoffers.filter(
        (item: Tradeoffer) => item.participantsteamid === transaction.buyer_id
      );
      console.log("FilterSkin: ", filterSkin);

      if (filterSkin.length > 0) {
        const filterItem = filterSkin.filter((item: Tradeoffer) => {
          console.log("AQUII", item);
          return item.myitems.filter((item: Myitem) => {
            return item.market_hash_name === skin.skin_market_hash_name;
          });
        });
        console.log("FilterItem: ", filterItem);

        // if (filterItem.length > 0) {
        //   const response = await this.transactionRepository.updateStatus(
        //     transactionId,
        //     "NegotiationSend"
        //   );
        //   console.log("Response: ", response);
        //   return response;
        // }
      }
      return "Skin not found";
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
