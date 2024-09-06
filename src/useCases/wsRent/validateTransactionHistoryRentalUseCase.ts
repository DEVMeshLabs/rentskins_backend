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

interface RentalTransaction extends PrismaRentalTransaction {
  skinsRent?: Skin[];
}

export class ValidateTransactionHistoryRentalUseCase {
  constructor(
    private transactionRentalRepository: IRentalTransactionRepository,
    private notificationRepository: INotificationRepository,
    private perfilRepository: IPerfilRepository,
    private skinRepository: ISkinsRepository
  ) {}

  async execute(
    transactionId: string,
    historic: IGetHistoricTrade
  ): Promise<void | string> {
    let dateStart: string;
    const transactionRental: RentalTransaction =
      await this.transactionRentalRepository.findById(transactionId);

    if (!transactionRental) {
      throw new TransactionNotExistError();
    }
    console.log((historic as any).data);
    console.log("Iniciando!");
    if (transactionRental.status === "WaitingForSellerConfirmation") {
      const filterTransactionParticipantsId = historic.payload.data.filter(
        (item) => {
          return (
            item.participantsteamid === transactionRental.buyerId &&
            item.items.sent.length > 0
          );
        }
      );
      console.log("Entro no 1", filterTransactionParticipantsId);
      const matchingItems = filterTransactionParticipantsId.some(
        (offer: Daum) => {
          dateStart = offer.date;
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

      console.log("filterTransactionParticipantsItems", matchingItems);

      if (matchingItems) {
        console.log("Entrou aqui 2");
        await this.handleSuccessTransaction(transactionRental, dateStart);
        return "Transação concluída com sucesso";
      }
      return "Nada a ser feito";
    }
  }

  async handleSuccessTransaction(
    transactionRental: RentalTransaction,
    dateStart: string
  ): Promise<void> {
    try {
      const perfilSeller = await this.perfilRepository.findByUser(
        transactionRental.skinsRent![0].seller_id
      );
      const skinIds = transactionRental.skinsRent!.map((skin) => skin.id);

      // Convertendo dateStart para um objeto Date
      const startDate = new Date(dateStart);
      // Garantindo que endDate seja pelo menos 7 dias após startDate
      const minEndDate = new Date(startDate);
      minEndDate.setDate(minEndDate.getDate() + 7);

      // Calculando endDate com base em daysQuantity
      const endDateNew = new Date(minEndDate);
      endDateNew.setDate(
        endDateNew.getDate() + Math.max(transactionRental.daysQuantity, 7)
      );

      await Promise.all([
        this.perfilRepository.updateTotalExchanges((perfilSeller as any).id),
        this.transactionRentalRepository.updateId(transactionRental.id, {
          status: "TrialPeriodStarted",
          startDate,
          endDate: endDateNew,
          sellerConfirmedAt: new Date(),
          trialPeriodStartedAt: new Date(),
        }),
        this.skinRepository.updateMany(skinIds, "Completed"),
        this.notificationRepository.create({
          owner_id: transactionRental.skinsRent![0].seller_id,
          description: `Parabéns! A partir de agora o locatário iniciará o período de teste da skin.`,
        }),
        this.notificationRepository.create({
          owner_id: transactionRental.buyerId,
          description: `Parabéns! A partir de agora você iniciará o período de teste da skin.`,
        }),
      ]);
    } catch (error) {
      console.error("Erro na handleSuccessTransaction", error);
      throw error;
    }
  }
}
