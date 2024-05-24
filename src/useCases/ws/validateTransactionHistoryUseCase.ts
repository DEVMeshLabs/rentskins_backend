import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
import { IGetHistoricTrade } from "./interface/getHistoricTrade";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { TransactionHistory } from "@prisma/client";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { TransactionHistoryNotExistError } from "../@errors/TransactionHistory/TransactionHistoryNotExistError";

interface IUpdateTransactionHistory {
  transactionHistory: TransactionHistory;
}

export class ValidateTransactionHistoryUseCase {
  constructor(
    private transactionHistory: ITransactionHistoryRepository,
    private transactionRepository: ITransactionRepository,
    private configurationRepository: IConfigurationRepository,
    private notificationRepository: INotificationRepository,
    private walletRepository: IWalletRepository,
    private perfilRepository: IPerfilRepository,
    private skinRepository: ISkinsRepository
  ) {}

  async execute(
    transactionId: string,
    historic: IGetHistoricTrade
  ): Promise<void | string> {
    const transactionHistory = await this.transactionHistory.findByTrasactionId(
      transactionId
    );
    if (!transactionHistory) {
      throw new TransactionHistoryNotExistError();
    }
    console.log("Passou aqui");
    if (transactionHistory.processTransaction === "Pending") {
      const filterTransactionParticipantsId =
        historic.jsonPayload.payload.data.filter(
          (item) =>
            item.participantsteamid === transactionHistory.buyer_id &&
            item.items.sent.length > 0
        );
      console.log(
        "filterTransactionParticipantsId",
        filterTransactionParticipantsId
      );
      console.log("Passou aqui 2");
      const filterTransactionParticipantsItems = filterTransactionParticipantsId
        .map((sents) => {
          const filteredItems = sents.items.sent.some((item) => {
            return item.assetid === transactionHistory.asset_id;
          });
          return filteredItems;
        })
        .filter(Boolean);

      console.log(
        "filterTransactionParticipantsItems",
        filterTransactionParticipantsItems
      );
      console.log("Passou aqui 3");
      if (filterTransactionParticipantsItems.length > 0) {
        console.log("Passou aqui 4");
        await this.handleSuccessTransaction({
          transactionHistory,
        });
      }
    }
  }

  async handleSuccessTransaction({
    transactionHistory,
  }: IUpdateTransactionHistory) {}
}
