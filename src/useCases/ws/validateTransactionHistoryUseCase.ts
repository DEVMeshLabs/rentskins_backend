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

  async execute(transactionId: string, historic: any): Promise<void | string> {
    const transactionHistory = await this.transactionHistory.findByTrasactionId(
      transactionId
    );
    console.log(transactionHistory);
    if (!transactionHistory) {
      throw new TransactionHistoryNotExistError();
    }
    console.log(historic);
    console.log("Passou aqui");
    if (transactionHistory.processTransaction === "Pending") {
      console.log("Chegou aqui");
      const filterTransactionParticipantsId = historic.payload.data.filter(
        (item) =>
          item.participantsteamid === transactionHistory.buyer_id &&
          item.items.sent.length > 0
      );

      console.log("Passou aqui 2");
      const filterTransactionParticipantsItems =
        filterTransactionParticipantsId.filter((tran) => {
          return tran.items.sent.filter((item) => {
            console.log(item);
            return item.assetid === transactionHistory.asset_id;
          });
        });

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
        return "Transação concluída com sucesso";
      }
      return "Nada a ser feito";
    }
  }

  async handleSuccessTransaction({
    transactionHistory,
  }: IUpdateTransactionHistory) {
    console.log("Iniciou a transação");
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
