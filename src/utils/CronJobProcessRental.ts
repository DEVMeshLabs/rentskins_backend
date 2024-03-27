import { env } from "@/env";

import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
import axios from "axios";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { TransactionHistory } from "@prisma/client";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { formatBalance } from "./formatBalance";
import { compareDates } from "./compareDates";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";

interface IUpdateTransactionHistory {
  transactionHistory: TransactionHistory;
}

export class CronJobProcessRental {
  constructor(
    private transactionHistoryRepository: ITransactionHistoryRepository,
    private rentalTransaction: IRentalTransactionRepository,
    private configurationRepository: IConfigurationRepository,
    private notificationRepository: INotificationRepository,
    private walletRepository: IWalletRepository,
    private perfilRepository: IPerfilRepository,
    private skinRepository: ISkinsRepository
  ) {}

  // Pegar todas as transações, filtrar por process = false, e processar cada uma delas
  // --------------------------------------------------------------------------------------------
  async execute() {
    console.log("Inciando cronjob Rental...");

    // Preciso verificar o assetid, o partnersteamid e o steamcommunityapikey
    await this.processPendingTransactions();

    console.log("Cronjob Rental finalizado...");
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
    console.log(allTransactions);
    if (!allTransactions.length) {
      return "Nenhuma transação pendente.";
    }

    for (const transaction of allTransactions) {
      const datesCompare = compareDates(transaction.dateProcess, new Date());
      if (!datesCompare || transaction.rentalTransaction_id === null) {
        return;
      }
      const inventorySeller = await this.processTransaction(transaction);

      if (inventorySeller && inventorySeller.length > 0) {
        const { completed, partnersteamid, receivedassetids, received } =
          inventorySeller[0];

        const { buyer_id, asset_id } = transaction;
        if (
          completed &&
          partnersteamid === buyer_id &&
          receivedassetids !== undefined &&
          receivedassetids[0] === asset_id &&
          received
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

  // --------------------------------------------------------------------------------------------
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

  /**
   * Logicas de sucesso e falha da transação:
   * Se falhar, quer dizer que o comprador não devolveu a skin, então será retirado o total_price da carteira do vendedor
   * Se de sucesso, quer dizer que o comprador devolveu a skin, então será adicionado o valor referente aos dias na carteira do vendedor
   */

  async handleSuccessTransaction({
    transactionHistory,
  }: IUpdateTransactionHistory) {
    const perfilSeller = await this.perfilRepository.findByUser(
      transactionHistory.seller_id
    );
    const rentalTransaction = await this.rentalTransaction.findById(
      transactionHistory.rentalTransaction_id
    );
    const skin = await this.skinRepository.findById(rentalTransaction.skin_id);

    await Promise.all([
      this.perfilRepository.updateTotalExchanges(perfilSeller.id),

      this.transactionHistoryRepository.updateId(transactionHistory.id, {
        processTransaction: true,
      }),
      this.rentalTransaction.updateId(rentalTransaction.id, {
        status: "Concluído",
      }),
      this.notificationRepository.create({
        owner_id: transactionHistory.seller_id,
        description: `Parabéns! O comprador realizou a devolução do item ${skin.skin_name} com sucesso. O valor ${rentalTransaction.remainder} já está na sua conta.`,
      }),
      this.notificationRepository.create({
        owner_id: transactionHistory.buyer_id,
        description: `Parabéns! Sua devolução foi finalizada com sucesso. O valor retornado foi de ${rentalTransaction.fee_total_price}.`,
      }),
      this.skinRepository.updateById(rentalTransaction.skin_id, {
        status: "Concluído",
        saledAt: new Date(),
      }),
      this.walletRepository.updateByUserValue(
        transactionHistory.seller_id,
        "increment",
        rentalTransaction.remainder
      ),
      this.walletRepository.updateByUserValue(
        transactionHistory.buyer_id,
        "increment",
        rentalTransaction.fee_total_price
      ),
    ]);
  }

  async handleFailedTransaction({
    transactionHistory,
  }: IUpdateTransactionHistory) {
    const perfilSeller = await this.perfilRepository.findByUser(
      transactionHistory.seller_id
    );

    const rentalTransaction = await this.rentalTransaction.findById(
      transactionHistory.rentalTransaction_id
    );
    const skin = await this.skinRepository.findById(rentalTransaction.skin_id);
    const { formattedBalance } = formatBalance(rentalTransaction.total_price);

    await Promise.all([
      this.transactionHistoryRepository.updateId(transactionHistory.id, {
        processTransaction: true,
      }),
      this.rentalTransaction.updateId(rentalTransaction.id, {
        status: "Concluído",
      }),
      this.notificationRepository.create({
        owner_id: transactionHistory.seller_id,
        description: `A venda da skin ${skin.skin_name} foi realizada com sucesso"`,
      }),
      this.notificationRepository.create({
        owner_id: transactionHistory.buyer_id,
        description: `Você não devolveu a skin ${skin.skin_name} no prazo estipulado, por isso foi retirado o valor de ${formattedBalance} da sua carteira.`,
      }),
      this.walletRepository.updateByUserValue(
        transactionHistory.seller_id,
        "increment",
        rentalTransaction.total_price
      ),
      this.skinRepository.updateById(rentalTransaction.skin_id, {
        status: "Concluído",
        saledAt: new Date(),
      }),
      this.perfilRepository.updateByUser(transactionHistory.seller_id, {
        total_exchanges_completed: perfilSeller.total_exchanges_completed + 1,
      }),
    ]);
  }
}
