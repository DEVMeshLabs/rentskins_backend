import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { Perfil, Skin, Transaction } from "@prisma/client";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { calculateDiscount } from "./calculateDiscount";

interface IComposeOwnerIdUpdates {
  transactionId: string;
  findTransaction: Transaction;
  updateConfirm: Transaction;
  skin: Skin;
  mediaDate?: any;
}

export class ComposeOwner {
  constructor(
    private skinRepository: ISkinsRepository,
    private walletRepository: IWalletRepository,
    private notificationsRepository: INotificationRepository,
    private perfilRepository: IPerfilRepository,
    private transactionRepository: ITransactionRepository
  ) {}

  async composeOwnerIdUpdates(
    ownerId: string,
    isTransactionFailed: boolean,
    data: IComposeOwnerIdUpdates,
    perfil?: Perfil
  ): Promise<any> {
    const { balance } = data.findTransaction;
    const formattedBalance = this.formatBalance(balance);
    const { newBalance } = calculateDiscount(data.updateConfirm.balance);

    const skinId = data.findTransaction.skin_id;
    const skinName = data.skin.skin_name;

    const sellerNotification = {
      owner_id: data.updateConfirm.seller_id,
      description: isTransactionFailed
        ? `A venda do item ${skinName} foi cancelada. Conclua as trocas com honestidade ou sua conta receberá uma punição.`
        : `A venda do item ${skinName} foi realizada com sucesso! Seus créditos foram carregados em ${formattedBalance}.`,
      skin_id: skinId,
    };

    const buyerNotification = {
      owner_id: data.updateConfirm.buyer_id,
      description: isTransactionFailed
        ? `A compra do item ${skinName} foi cancelada. ${formattedBalance} foram restaurados em seus créditos.`
        : `A compra do item ${skinName} foi realizada com sucesso! Verifique o item em seu inventário.`,
      skin_id: skinId,
    };

    if (isTransactionFailed) {
      return [
        this.walletRepository.updateByUserValue(
          ownerId,
          "increment",
          data.findTransaction.balance
        ),
        this.notificationsRepository.create(sellerNotification),
        this.transactionRepository.updateId(data.findTransaction.id, {
          status: "Falhou",
        }),
        this.notificationsRepository.create(buyerNotification),
        this.skinRepository.updateById(data.updateConfirm.skin_id, {
          status: "Falhou",
        }),
      ];
    } else {
      return [
        this.walletRepository.updateByUserValue(
          ownerId,
          "increment",
          newBalance
        ),
        this.perfilRepository.updateByUser(ownerId, {
          total_exchanges_completed: perfil.total_exchanges_completed + 1,
        }),

        this.transactionRepository.updateId(data.transactionId, {
          salesAt: new Date(),
        }),
        this.perfilRepository.updateByUser(ownerId, {
          delivery_time: data.mediaDate,
        }),

        this.notificationsRepository.create(sellerNotification),
        this.notificationsRepository.create(buyerNotification),
        this.skinRepository.updateById(data.updateConfirm.skin_id, {
          status: "Concluído",
          saledAt: new Date(),
        }),
      ];
    }
  }

  formatBalance(balance: number) {
    return balance.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  }
}
