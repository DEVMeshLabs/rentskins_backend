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
    console.log("Entrou no Use Case");
    const transaction = await this.transactionRepository.findById(
      transactionId
    );
    console.log("Transaction: ", transaction);
    const skin = await this.skinRepository.findById(transaction.skin_id);

    if (!transaction) {
      throw new TransactionHistoryNotExistError();
    } else if (transaction.status === "NegotiationSend") {
      throw new StatusHasAlreadyBeenUpdatedError();
    }
    console.log("Passou daqui");
    console.log("Skin", skin);
    if (transaction.status === "Default") {
      console.log("Entrou passo 1");
      const tradeoffers = historic.jsonPayload.payload.tradeoffers;

      const filterTransactionParticipantsId = tradeoffers.filter((item) => {
        if (item.participantsteamid === transaction.buyer_id) {
          console.log("Chegou aqui");
          const filterItems = item.myitems.some((myitem) => {
            if (myitem.market_hash_name === skin.skin_market_hash_name) {
              console.log("Verificado");
              return true;
            }
            console.log("Não Verificado");
            return false;
          });
          return filterItems;
        }
        return false;
      });
      if (filterTransactionParticipantsId) {
        return this.handleSuccessTransaction(transactionId);
      }
    }
  }

  async handleSuccessTransaction(id: string) {
    console.log("Entrouuuu");
    await this.transactionRepository.updateStatus(id, "NegotiationSend");
  }
}
