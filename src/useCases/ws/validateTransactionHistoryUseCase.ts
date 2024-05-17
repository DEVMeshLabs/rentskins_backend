import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
import { IGetHistoricTrade } from "./interface/getHistoricTrade";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { TransactionHistory } from "@prisma/client";
import { formatBalance } from "@/utils/formatBalance";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { ValidateTransactionHistoryError } from "../@errors/ws/validateTransactionHistoryError";
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

    if (
      historic &&
      historic.jsonPayload.payload &&
      historic.jsonPayload.payload.verified === true &&
      historic.jsonPayload.payload.data &&
      historic.jsonPayload.payload.data.length > 0 &&
      transactionHistory.processTransaction === "Pending"
    ) {
      const filterTransactionParticipantsId =
        historic.jsonPayload.payload.data.filter(
          (data) =>
            data.participantsteamid === transactionHistory.buyer_id &&
            data.items.sent.length > 0
        );
      const filterTransactionParticipantsItems = filterTransactionParticipantsId
        .map((sents) => {
          const filteredItems = sents.items.sent.some((item) => {
            return item.assetid === transactionHistory.asset_id;
          });
          return filteredItems;
        })
        .filter(Boolean);

      if (filterTransactionParticipantsItems.length === 0) {
        throw new ValidateTransactionHistoryError();
      }

      await this.handleSuccessTransaction({
        transactionHistory,
      });
    }
  }

  async handleSuccessTransaction({
    transactionHistory,
  }: IUpdateTransactionHistory) {
    const perfilSeller = await this.perfilRepository.findByUser(
      transactionHistory.seller_id
    );

    const transaction = await this.transactionRepository.findById(
      transactionHistory.transaction_id
    );
    const { porcentagem } = formatBalance(transaction.balance);

    await Promise.all([
      this.perfilRepository.updateTotalExchanges(perfilSeller.id),

      this.transactionHistory.updateId(transactionHistory.id, {
        processTransaction: "Completed",
      }),
      this.transactionRepository.updateStatus(
        transaction.id,
        "NegociationAccepted"
      ),
      this.notificationRepository.create({
        owner_id: transactionHistory.seller_id,
        description: `Parabéns! Sua venda foi finalizada com sucesso. O valor recebido foi de ${porcentagem}.`,
      }),
      this.notificationRepository.create({
        owner_id: transactionHistory.buyer_id,
        description: `Parabéns! Sua compra foi finalizada com sucesso.`,
      }),
      this.skinRepository.updateById(transaction.skin_id, {
        status: "Concluído",
        saledAt: new Date(),
      }),
      this.walletRepository.updateByUserValue(
        transactionHistory.seller_id,
        "increment",
        porcentagem
      ),
    ]);
  }
}
