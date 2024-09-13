import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import type { Daum, IGetHistoricTrade } from "../ws/interface/getHistoricTrade";
import type { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";
import {
  RentalTransaction as PrismaRentalTransaction,
  Skin,
} from "@prisma/client";
import type { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";

interface RentalTransaction extends PrismaRentalTransaction {
  skinsRent?: Skin[];
}

export class ValidateTransactionHistoryReturnBuyerTransactionRentalUseCase {
  constructor(
    private transactionRentalRepository: IRentalTransactionRepository,
    private notificationRepository: INotificationRepository,
    private perfilRepository: IPerfilRepository,
    private skinRepository: ISkinsRepository,
    private walletRepository: IWalletRepository
  ) {}

  async execute(
    transactionId: string,
    historic: IGetHistoricTrade
  ): Promise<void | string> {
    const transactionRental: RentalTransaction =
      await this.transactionRentalRepository.findById(transactionId);

    if (!transactionRental) {
      throw new TransactionNotExistError();
    }
    console.log(historic);
    console.log((historic as any).data);
    console.log("Iniciando! Buyer");
    if (transactionRental.status === "WaitingForReturnConfirmation") {
      const filterTransactionParticipantsId = historic.payload.data.filter(
        (item) => {
          return (
            item.participantsteamid === transactionRental.buyerId &&
            item.items.sent.length > 0
          );
        }
      );

      const matchingItems = filterTransactionParticipantsId.some(
        (offer: Daum) => {
          return transactionRental.skinsRent.every((skin) => {
            return offer.items.sent.some((item) => {
              return (
                item.markethashname === skin.skin_market_hash_name &&
                item.instanceid === skin.skin_instanceid &&
                item.classid === skin.skin_classid
              );
            });
          });
        }
      );

      console.log(
        "filterTransactionParticipantsItems ------- BUYER",
        matchingItems
      );

      if (matchingItems) {
        console.log("Entrou aqui 2 --- BUYER");
        await this.handleSuccessTransaction(transactionRental);
        return "Transação concluída com sucesso";
      }
      return "Nada a ser feito";
    }
  }

  async handleSuccessTransaction(
    transactionRental: RentalTransaction
  ): Promise<void> {
    const commissionRate = 0.1; // 10% de comissão
    try {
      const perfilSeller = await this.perfilRepository.findByUser(
        transactionRental.skinsRent![0].seller_id
      );

      const skinIds = transactionRental.skinsRent!.map((skin) => skin.id);

      const totalSkinPrice = transactionRental.skinsRent.reduce(
        (total, skin) => total + skin.skin_price,
        0
      );
      const sellerId = transactionRental.skinsRent[0].seller_id;
      const sellerAmount = totalSkinPrice * (1 - commissionRate);

      await Promise.all([
        this.perfilRepository.updateTotalExchanges((perfilSeller as any).id),
        this.transactionRentalRepository.updateId(transactionRental.id, {
          status: "Completed",
          returnDueAt: new Date(),
        }),
        this.skinRepository.updateMany(skinIds, "Completed"),
        this.notificationRepository.create({
          owner_id: transactionRental.skinsRent![0].seller_id,
          description: `Parabéns! A locação da skin foi concluída com sucesso. O valor de ${sellerAmount} foi adicionado à sua carteira.`,
        }),
        this.notificationRepository.create({
          owner_id: transactionRental.buyerId,
          description: `Parabéns! A locação da skin foi concluída com sucesso.`,
        }),
        this.walletRepository.updateByUserValue(
          sellerId,
          "increment",
          sellerAmount
        ),
      ]);
    } catch (error) {
      console.error("Erro na handleSuccessTransaction", error);
      throw error;
    }
  }
}
