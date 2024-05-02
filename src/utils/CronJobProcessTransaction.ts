import { env } from "@/env";

import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
import axios from "axios";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { TransactionHistory } from "@prisma/client";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { formatBalance } from "./formatBalance";
import { compareDates } from "./compareDates";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";

interface IUpdateTransactionHistory {
  transactionHistory: TransactionHistory;
}

export class CronJobProcessTransaction {
  constructor(
    private transactionHistoryRepository: ITransactionHistoryRepository,
    private transactionRepository: ITransactionRepository,
    private configurationRepository: IConfigurationRepository,
    private notificationRepository: INotificationRepository,
    private walletRepository: IWalletRepository,
    private perfilRepository: IPerfilRepository,
    private skinRepository: ISkinsRepository
  ) {}

  // Pegar todas as transações, filtrar por process = false, e processar cada uma delas
  // --------------------------------------------------------------------------------------------
  async execute() {
    console.log("Inciando cronjob...");

    // Preciso verificar o assetid, o partnersteamid e o steamcommunityapikey
    await this.processPendingTransactions();

    console.log("Cronjob finalizado...");
  }

  // --------------------------------------------------------------------------------------------
  async fetchInventory(
    steamcommunityapikey: string,
    partnersteamid: string,
    assetid: string
  ) {
    try {
      const baseUrl = "https://www.steamwebapi.com";

      const inventorySeller = await axios
        .post(
          `${baseUrl}/steam/api/trade/status?key=${env.KEY_STEAM_WEB_API}`,
          {
            steamcommunityapikey,
            partnersteamid,
            assetid,
          }
        )
        .then((response) => response.data);
      return inventorySeller;
    } catch (error) {
      return error.response.data;
    }
  }

  // --------------------------------------------------------------------------------------------
  async processPendingTransactions() {
    const allTransactions = await this.transactionHistoryRepository.findByMany(
      false
    );
    if (!allTransactions.length) {
      return "Nenhuma transação pendente.";
    }

    for (const transaction of allTransactions) {
      const datesCompare = compareDates(transaction.dateProcess, new Date());
      if (!datesCompare || transaction.transaction_id === null) {
        return;
      }

      const inventorySeller = await this.processTransaction(transaction);

      if (inventorySeller && inventorySeller.length > 0) {
        const { completed, partnersteamid, sentassetids, sent } =
          inventorySeller[0];

        const { buyer_id, asset_id } = transaction;
        if (
          completed &&
          partnersteamid === buyer_id &&
          sentassetids !== undefined &&
          sentassetids[0] === asset_id &&
          sent
        ) {
          await this.handleSuccessTransaction({
            transactionHistory: transaction,
          });
        } else {
          await this.handleFailedTransaction({
            transactionHistory: transaction,
          });
        }
      } else {
        await this.handleFailedTransaction({ transactionHistory: transaction });
      }
    }
    return "Transação processada com sucesso.";
  }

  // --------- Ai fudeu -----------------------------------------------------------------------------------
  async processTransaction(transaction: TransactionHistory) {
    if (!transaction) {
      return;
    }
    const config = await this.configurationRepository.findByUser(
      transaction.seller_id
    );

    if (!config.key) {
      return "Key steam not found";
    }

    if (config && config.key && config.key !== " ") {
      const inventorySeller = await this.fetchInventory(
        config.key,
        transaction.buyer_id,
        transaction.asset_id
      );
      return inventorySeller;
    } else {
      return false;
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

      this.transactionHistoryRepository.updateId(transactionHistory.id, {
        processTransaction: true,
      }),
      this.transactionRepository.updateId(transaction.id, {
        status: "Concluído",
      }),
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

  async handleFailedTransaction({
    transactionHistory,
  }: IUpdateTransactionHistory) {
    const perfilSeller = await this.perfilRepository.findByUser(
      transactionHistory.seller_id
    );

    const transaction = await this.transactionRepository.findById(
      transactionHistory.transaction_id
    );
    const skin = await this.skinRepository.findById(transaction.skin_id);
    const { formattedBalance } = formatBalance(transaction.balance);

    await Promise.all([
      this.transactionHistoryRepository.updateId(transactionHistory.id, {
        processTransaction: true,
      }),
      this.transactionRepository.updateId(transaction.id, {
        status: "Falhou",
      }),
      this.notificationRepository.create({
        owner_id: transactionHistory.seller_id,
        description: `A venda da skin ${skin.skin_name} foi cancelada por falta de entrega. Isso pode prejudicar sua reputação como vendedor. Seu anúncio foi reativado.`,
      }),
      this.notificationRepository.create({
        owner_id: transactionHistory.buyer_id,
        description: `O vendedor não enviou a skin. O valor de ${formattedBalance} foi devolvido para sua carteira.`,
      }),
      this.walletRepository.updateByUserValue(
        transactionHistory.buyer_id,
        "increment",
        transaction.balance
      ),
      this.skinRepository.updateById(transaction.skin_id, {
        status: null,
        saledAt: null,
      }),
      this.perfilRepository.updateByUser(transactionHistory.seller_id, {
        total_exchanges_failed: perfilSeller.total_exchanges_failed + 1,
      }),
    ]);
  }
}
