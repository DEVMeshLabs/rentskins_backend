import { TransactionHistoryNotExistError } from "../@errors/TransactionHistory/TransactionHistoryNotExistError";
import { StatusHasAlreadyBeenUpdatedError } from "../@errors/ws/StatusHasAlreadyBeenUpdatedError";
import { IGetTradesPending } from "./interface/getTradesPending";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";

export class ValidateTradesPending {
  constructor(
    private transactionRepository: ITransactionRepository,
    private skinRepository: ISkinsRepository
  ) {}

  async execute(
    transactionId: string,
    historic: IGetTradesPending
  ): Promise<any> {
    console.log("Entrou no Use Case");
    const transaction = await this.transactionRepository.findById(
      transactionId
    );

    const skin = await this.skinRepository.findById(transaction.skin_id);
    console.log("Skin: ", skin);

    if (!transaction) {
      throw new TransactionHistoryNotExistError();
    } else if (transaction.status === "NegotiationSend") {
      throw new StatusHasAlreadyBeenUpdatedError();
    }
    console.log("Passou daqui");
    const tradeoffers = historic.jsonPayload.payload.tradeoffers;

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
  }

  async handleSuccessTransaction(id: string) {
    console.log("Entrouuuu");
  }
}
