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

    if (!transaction) {
      throw new TransactionHistoryNotExistError();
    } else if (transaction.status === "NegotiationSend") {
      throw new StatusHasAlreadyBeenUpdatedError();
    }
    console.log("Passou daqui");
    if (transaction.status === "Default") {
      console.log("Entrou passo 1");
      // const tradeoffers = historic.jsonPayload.payload.tradeoffers;

      const response = await this.transactionRepository.updateStatus(
        transactionId,
        "NegotiationSend"
      );
      console.log("Response: ", response);
      return response;
    }
  }

  async handleSuccessTransaction(id: string) {
    console.log("Entrouuuu");
  }
}
