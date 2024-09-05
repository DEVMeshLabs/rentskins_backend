import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import type { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";
import type { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import type { RentalTransaction, Skin } from "@prisma/client";

interface RentalTransactionWithSkinRent extends RentalTransaction {
  skinsRent: Skin[];
}

export class CronJobProcessRental {
  constructor(
    private rentalTransactionRepository: IRentalTransactionRepository,
    private walletRepository: IWalletRepository,
    private notificationRepository: INotificationRepository,
    private skinsRepository: ISkinsRepository,
    private perfilRepository: IPerfilRepository
  ) {}

  async execute(): Promise<void> {
    console.log("Iniciando Rental cronjob...");

    try {
      await Promise.all([
        this.checkPendingGuarantee(),
        this.sendDeadlineNotification(),
        this.checkSendSkinSeller(),
      ]);
    } catch (error) {
      console.error("Erro durante a execução do cronjob de aluguel:", error);
    }

    console.log("Cronjob Rental finalizado...");
  }

  private async checkSendSkinSeller(): Promise<void> {
    try {
      const pendingTransactions =
        await this.rentalTransactionRepository.checkSendSkinSeller();

      if (pendingTransactions.length === 0) {
        console.log("Nenhum envio de skin pendente encontrado.");
        return;
      }

      const skinsIds = [];

      const transactionPromises = pendingTransactions.map(
        async (transaction: RentalTransactionWithSkinRent) => {
          for (const skinsRent of transaction.skinsRent) {
            skinsIds.push(skinsRent.id);
          }
          console.log(transaction);
          console.log(transaction.skinsRent[0].seller_id);
          const steamId = transaction.skinsRent[0].seller_id;

          await Promise.all([
            this.rentalTransactionRepository.updateId(transaction.id, {
              status: "Failed",
            }),
            this.perfilRepository.updateTotalExchangesFailed(steamId),
            this.walletRepository.updateByUserValue(
              transaction.buyerId,
              "increment",
              transaction.totalPriceRent
            ),
            this.skinsRepository.updateMany(skinsIds, null),
            this.notificationRepository.create({
              owner_id: transaction.skinsRent[0].seller_id,
              description:
                "Você não enviou a skin a tempo e a transação foi cancelada.",
            }),
            this.notificationRepository.create({
              owner_id: transaction.buyerId,
              description:
                "O vendedor não enviou a skin a tempo e a transação foi cancelada.",
            }),
          ]);
        }
      );
      await Promise.all(transactionPromises);
      console.log("Check send skin seller finalizado.");
    } catch (error) {
      console.error("Erro ao verificar skins pendentes:", error);
    }
  }

  private async checkPendingGuarantee(): Promise<void> {
    try {
      const pendingTransactions =
        await this.rentalTransactionRepository.checkPendingGuarantee();

      if (pendingTransactions.length === 0) {
        console.log("Nenhuma transação pendente encontrada.");
        return;
      }

      const sellerIds = new Set<string>();

      const transactionPromises = pendingTransactions.map(
        async (transaction) => {
          for (const skinsRent of (transaction as any).skinsRent) {
            sellerIds.add(skinsRent.seller_id);
            await this.skinsRepository.updateById(skinsRent.id, {
              status: null,
            });
          }

          await Promise.all([
            this.rentalTransactionRepository.updateId(transaction.id, {
              status: "Failed",
            }),
            this.walletRepository.updateByUserValue(
              transaction.buyerId,
              "increment",
              transaction.totalPriceRent
            ),
            this.notificationRepository.create({
              owner_id: transaction.buyerId,
              description:
                "Você não enviou a garantia a tempo e a transação foi cancelada.",
            }),
          ]);
        }
      );

      await Promise.all(transactionPromises);

      const sellerNotifications = Array.from(sellerIds).map((sellerId) => ({
        owner_id: sellerId,
        description:
          "O comprador não enviou a garantia a tempo e a transação foi cancelada.",
      }));

      if (sellerNotifications.length > 0) {
        await this.notificationRepository.createMany(sellerNotifications);
      }
    } catch (error) {
      console.error("Erro ao verificar garantias pendentes:", error);
    }
  }

  private async sendDeadlineNotification(): Promise<void> {
    const transactionsToNotify =
      await this.rentalTransactionRepository.sendDeadlineNotification();

    if (transactionsToNotify.length === 0) return;

    const transactionIds = transactionsToNotify.map(
      (transaction) => transaction.id
    );

    const notifications = transactionsToNotify.map((transaction) => ({
      owner_id: transaction.buyerId,
      description:
        "Seu período de aluguel está prestes a terminar. Por favor, devolva a skin.",
    }));

    await Promise.all([
      this.notificationRepository.createMany(notifications),
      this.rentalTransactionRepository.updateMany(transactionIds, {
        deadlineNotified: true,
      }),
    ]);
  }
}
