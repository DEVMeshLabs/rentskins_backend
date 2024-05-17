import { TransactionHistoryNotExistError } from "../@errors/TransactionHistory/TransactionHistoryNotExistError";
import { StatusHasAlreadyBeenUpdatedError } from "../@errors/ws/StatusHasAlreadyBeenUpdatedError";
import { IGetTradesPending, Tradeoffer } from "./interface/getTradesPending";
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
  ): Promise<void | string | Tradeoffer[]> {
    const transaction = await this.transactionRepository.findById(
      transactionId
    );
    const skin = await this.skinRepository.findById(transaction.skin_id);

    if (!transaction) {
      throw new TransactionHistoryNotExistError();
    } else if (transaction.status === "NegotiationSend") {
      throw new StatusHasAlreadyBeenUpdatedError();
    }

    if (
      historic &&
      historic.jsonPayload.verified === true &&
      historic.jsonPayload.payload &&
      historic.jsonPayload.payload.tradeoffers &&
      transaction.status === "Default"
    ) {
      console.log("Entrou passo 1");
      const tradeoffers = historic.jsonPayload.payload.tradeoffers;

      const filterTransactionParticipantsId = tradeoffers.filter((item) => {
        if (item.participantsteamid === transaction.buyer_id) {
          const filterItems = item.myitems.some(async (myitem) => {
            if (
              myitem.market_hash_name === skin.skin_market_hash_name &&
              myitem.classid === skin.skin_classid &&
              myitem.instanceid === skin.skin_instanceid
            ) {
              console.log("Entrou passo 2");
              await this.handleSuccessTransaction(transactionId);
              return true;
            }
            return false;
          });
          return filterItems;
        }
        return false;
      });
      return filterTransactionParticipantsId;
    }
  }

  async handleSuccessTransaction(id: string) {
    console.log("Entrouuuu");
    await this.transactionRepository.updateStatus(id, "NegotiationSend");
  }
}