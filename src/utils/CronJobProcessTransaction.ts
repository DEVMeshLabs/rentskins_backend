import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
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
  async processPendingTransactions() {
    const allTransactions = await this.transactionHistoryRepository.findByMany(
      "Pending"
    );
    console.log(allTransactions);
    if (!allTransactions.length) {
      return "Nenhuma transação pendente.";
    }

    for (const transaction of allTransactions) {
      const datesCompare = compareDates(transaction.dateProcess, new Date());
      if (!datesCompare || transaction.transaction_id === null) {
        return;
      }
      const perfilSeller = await this.perfilRepository.findByUser(
        transaction.seller_id[0]
      );
      console.log(perfilSeller);
      await this.handleFailedTransaction({ transactionHistory: transaction });
    }
    return "Transação processada com sucesso.";
  }

  async handleSuccessTransaction({
    transactionHistory,
  }: IUpdateTransactionHistory) {
    const perfilSeller = await this.perfilRepository.findByUser(
      transactionHistory.seller_id[0]
    );

    const transaction = await this.transactionRepository.findById(
      transactionHistory.transaction_id
    );
    const { porcentagem } = formatBalance(transaction.balance);
    console.log(transaction);

    await Promise.allSettled([
      this.perfilRepository.updateTotalExchanges(perfilSeller[0].id),

      this.transactionHistoryRepository.updateId(transactionHistory.id, {
        processTransaction: "Completed",
      }),
      this.transactionRepository.updateId(transaction.id, {
        status: "NegociationAccepted",
      }),
      this.notificationRepository.create({
        owner_id: transactionHistory.seller_id[0],
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
        transactionHistory.seller_id[0],
        "increment",
        porcentagem
      ),
    ]);
  }

  async handleFailedTransaction({
    transactionHistory,
  }: IUpdateTransactionHistory) {
    const perfilSeller = await this.perfilRepository.findByUser(
      transactionHistory.seller_id[0]
    );

    const transaction = await this.transactionRepository.findById(
      transactionHistory.transaction_id
    );
    const skin = await this.skinRepository.findById(transaction.skin_id);
    const { formattedBalance } = formatBalance(transaction.balance);

    await Promise.allSettled([
      this.transactionHistoryRepository.updateId(transactionHistory.id, {
        processTransaction: "Failed",
      }),
      this.transactionRepository.updateId(transaction.id, {
        status: "NegociationRejected",
      }),
      this.notificationRepository.create({
        owner_id: transactionHistory.seller_id[0],
        description: `A venda da skin ${skin.skin_name} foi cancelada por falta de entrega. Isso pode prejudicar sua reputação como vendedor. Seu anúncio foi excluído!`,
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
        status: "Falhou",
      }),
      this.perfilRepository.updateByUser(transactionHistory.seller_id[0], {
        total_exchanges_failed: perfilSeller.total_exchanges_failed + 1,
      }),
    ]);
  }
}
