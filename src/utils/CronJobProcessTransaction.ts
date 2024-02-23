// import { env } from "@/env";
import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
// import axios from "axios";
import mockInventory from "./mockInventory.json";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { TransactionHistory } from "@prisma/client";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { formatBalance } from "./formatBalance";

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
    private perfilRepository: IPerfilRepository
  ) {}

  // Pegar todas as transações, filtrar por process = false, e processar cada uma delas
  // --------------------------------------------------------------------------------------------
  async execute() {
    console.log("Inciando cronjob...");

    // Preciso verificar o assetid, o partnersteamid e o steamcommunityapikey
    const valid = await this.processPendingTransactions();

    console.log(valid);
  }

  // --------------------------------------------------------------------------------------------
  async fetchInventory(
    steamcommunityapikey: string,
    partnersteamid: string,
    assetid: string
  ) {
    try {
      const inventorySeller = mockInventory;
      return inventorySeller;
    } catch (error) {
      console.log(error);
    }
  }

  // --------------------------------------------------------------------------------------------
  async processPendingTransactions() {
    const allTransactions = await this.transactionHistoryRepository.findByMany(
      false
    );
    console.log("allTransactions", allTransactions);

    if (allTransactions.length === 0) {
      return "Nenhuma transação pendente.";
    }

    for (let i = 0; i < allTransactions.length; i++) {
      const inventorySeller = await this.processTransaction(allTransactions[i]);

      if (inventorySeller && inventorySeller.length > 0) {
        if (
          inventorySeller[0].completed === true &&
          inventorySeller[0].partnersteamid === allTransactions[i].buyer_id &&
          inventorySeller[0].receivedassetids.includes(
            allTransactions[i].asset_id
          )
        ) {
          await this.handleSuccessTransaction({
            transactionHistory: allTransactions[i],
          });
        } else {
          await this.handleFailedTransaction({
            transactionHistory: allTransactions[i],
          });
        }
      }
    }
    return "Transação processada com sucesso.";
  }

  // --------------------------------------------------------------------------------------------
  async processTransaction(transaction: TransactionHistory) {
    if (!transaction) {
      return;
    }
    const config = await this.configurationRepository.findByUser(
      transaction.seller_id
    );

    if (config && config.key && config.key !== " ") {
      const inventorySeller = await this.fetchInventory(
        config.key,
        transaction.seller_id,
        transaction.asset_id
      );

      return inventorySeller;
    } else {
      return false;
    }
  }

  // Atualizar a transação o perfil do comprador e do vendedor e gerar notificações;
  /**
   * [x] - Preciso atualizar a transação para completed
   * [x] - Preciso atualizar a transactionHistory para processTransaction = true
   * [x] - Preciso gerar notificações para o comprador e para o vendedor
   * [x] - Preciso atualizar o saldo do vendedor
   * [x] - Preciso atualizar o total de vendas completas do vendedor
   */

  async handleSuccessTransaction({
    transactionHistory,
  }: IUpdateTransactionHistory) {
    const perfilSeller = await this.perfilRepository.findByUser(
      transactionHistory.seller_id
    );

    const transaction = await this.transactionRepository.findById(
      transactionHistory.transaction_id
    );
    const { formattedBalance, porcentagem } = formatBalance(
      transaction.balance
    );

    console.log("porcentagem: " + porcentagem);

    await Promise.all([
      this.perfilRepository.updateTotalExchanges(perfilSeller.id),

      this.transactionHistoryRepository.updateId(transactionHistory.id, {
        processTransaction: true,
      }),
      this.transactionRepository.updateId(transaction.id, {
        status: "concluído",
      }),
      this.notificationRepository.create({
        owner_id: transactionHistory.seller_id,
        description: `Parabéns! Sua venda foi finalizada com sucesso. O valor recebido foi de ${formattedBalance}.`,
      }),
      this.notificationRepository.create({
        owner_id: transactionHistory.buyer_id,
        description: `Parabéns! Sua compra foi finalizada com sucesso.`,
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
    const { formattedBalance } = formatBalance(transaction.balance);

    await Promise.all([
      this.transactionHistoryRepository.updateId(transactionHistory.id, {
        processTransaction: true,
      }),
      this.transactionRepository.updateId(transaction.id, {
        status: "Falhada",
      }),
      this.notificationRepository.create({
        owner_id: transactionHistory.seller_id,
        description: `Algo aconteceu de errado com a sua venda.`,
      }),
      this.notificationRepository.create({
        owner_id: transactionHistory.buyer_id,
        description: `Algo aconteceu de errado com a sua compra. O valor de ${formattedBalance} foi devolvido para sua carteira.`,
      }),
      this.walletRepository.updateByUserValue(
        transactionHistory.buyer_id,
        "increment",
        transaction.balance
      ),
      this.perfilRepository.updateByUser(transactionHistory.seller_id, {
        total_exchanges_failed: perfilSeller.total_exchanges_failed + 1,
      }),
    ]);
  }
}

// const baseUrl = "https://www.steamwebapi.com";

// const inventorySeller = await axios.post(
//   `${baseUrl}/steam/api/trade/status?key=${env.KEY_STEAM_WEB_API}`,
//   {
//     steamcommunityapikey,
//     partnersteamid,
//     assetid,
//   }
// );
