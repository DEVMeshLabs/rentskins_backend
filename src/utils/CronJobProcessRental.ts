import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";
import type { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";

export class CronJobProcessRental {
  constructor(
    private rentalTransactionRepository: IRentalTransactionRepository,
    private walletRepository: IWalletRepository,
    private notificationRepository: INotificationRepository,
    private skinsRepository: ISkinsRepository
  ) {}

  async execute(): Promise<void> {
    console.log("Iniciando Rental cronjob...");

    try {
      await this.checkPendingGuarantee();
    } catch (error) {
      console.error("Erro durante a execução do cronjob de aluguel:", error);
    }

    console.log("Cronjob Rental finalizado...");
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

      for (const transaction of pendingTransactions) {
        for (const skinsRent of (transaction as any).skinsRent) {
          sellerIds.add(skinsRent.seller_id);
          await this.skinsRepository.updateById(skinsRent.id, { status: null });
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

      const sellerNotifications = Array.from(sellerIds).map((sellerId) =>
        this.notificationRepository.create({
          owner_id: sellerId,
          description:
            "O comprador não enviou a garantia a tempo e a transação foi cancelada.",
        })
      );

      await Promise.all(sellerNotifications);
    } catch (error) {
      console.error("Erro ao verificar garantias pendentes:", error);
    }
  }
}
