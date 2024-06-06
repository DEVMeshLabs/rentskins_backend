import { TransactionHistoryNotExistError } from "../@errors/TransactionHistory/TransactionHistoryNotExistError";
import { StatusHasAlreadyBeenUpdatedError } from "../@errors/ws/StatusHasAlreadyBeenUpdatedError";
import { IGetTradesPending } from "./interface/getTradesPending";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";

export class ValidatePendingTradeReceived {
  constructor(
    private transactionRepository: ITransactionRepository,
    private skinRepository: ISkinsRepository
  ) {}

  async execute(
    transactionId: string,
    historic: IGetTradesPending
  ): Promise<any> {
    const transaction = await this.transactionRepository.findById(
      transactionId
    );

    if (!transaction) {
      throw new TransactionHistoryNotExistError();
    } else if (transaction.status === "NegotiationSend") {
      throw new StatusHasAlreadyBeenUpdatedError();
    }
    if (transaction.status === "InProgress") {
      // const tradeoffers = historic.jsonPayload.payload.tradeoffers;

      const response = await this.transactionRepository.updateStatus(
        transactionId,
        "NegotiationSend"
      );
      return response;
    }
  }

  async handleSuccessTransaction(id: string) {}
}
