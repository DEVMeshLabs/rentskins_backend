import { TransactionHistoryNotExistError } from "@/useCases/@errors/TransactionHistory/TransactionHistoryNotExistError";
import { StatusHasAlreadyBeenUpdatedError } from "@/useCases/@errors/ws/StatusHasAlreadyBeenUpdatedError";
import { makeGetSkinUseCase } from "@/useCases/@factories/Skin/makeGetSkinUseCase";
import { makeGetIdTransactionUseCase } from "@/useCases/@factories/Transaction/makeGetIdTransactionUseCase";
import { makeValidateTradesPendingUseCase } from "@/useCases/@factories/ws/makeValidateTradesPendingUseCase";
import { IGetTradesPending } from "@/useCases/ws/interface/getTradesPending";
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

    console.log("Entrou no Use Case");
    const transaction = await makeTransaction.execute(transactionId);

    const skin = await makeSkin.execute(transaction.skin_id);
    console.log("Skin: ", skin);

    if (!transaction) {
      throw new TransactionHistoryNotExistError();
    } else if (transaction.status === "NegotiationSend") {
      throw new StatusHasAlreadyBeenUpdatedError();
    }
    console.log("Passou daqui");
    const tradeoffers = body.jsonPayload.payload.tradeoffers;
    console.log("Tradeoffers: ", tradeoffers);

    console.log(
      "Transaction Buyer: ",
      transaction.buyer_id,
      "Tradeoffers: ",
      tradeoffers.participantsteamid
    );

    console.log(
      "Validação:",
      tradeoffers.participantsteamid === transaction.buyer_id
    );
    if (
      transaction.status === "Default" &&
      tradeoffers.participantsteamid === transaction.buyer_id
    ) {
      console.log("Entrou passo 1");
      const filterSkin = tradeoffers.myitems.filter((item) => {
        return item.market_hash_name === skin.skin_market_hash_name;
      });
      console.log("FilterSkin: ", filterSkin);
      if (filterSkin.length > 0) {
        const response = await this.transactionRepository.updateStatus(
          transactionId,
          "NegotiationSend"
        );
        console.log("Response: ", response);
        return response;
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
