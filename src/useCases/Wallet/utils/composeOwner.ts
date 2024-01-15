import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { Perfil, Skin, Transaction } from "@prisma/client";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { calculateDiscount } from "./calculateDiscount";

interface IComposeOwnerIdUpdates {
  id: string;
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

    const sellerNotification = this.createSellerNotification(
      data,
      isTransactionFailed,
      formattedBalance
    );
    const buyerNotification = this.createBuyerNotification(
      data,
      isTransactionFailed,
      formattedBalance
    );

    if (isTransactionFailed) {
      return this.handleFailedTransaction(
        ownerId,
        data,
        sellerNotification,
        buyerNotification
      );
    } else {
      return this.handleSuccessfulTransaction(
        ownerId,
        data,
        newBalance,
        sellerNotification,
        buyerNotification
      );
    }
  }

  createSellerNotification(
    data: IComposeOwnerIdUpdates,
    isTransactionFailed: boolean,
    formattedBalance: string
  ) {
    const sellerNotification = {
      owner_id: data.updateConfirm.seller_id,
      description: isTransactionFailed
        ? `A venda do item ${data.skin.skin_name} foi cancelada. Conclua as trocas com honestidade ou sua conta receberá uma punição.`
        : `A venda do item ${data.skin.skin_name} foi realizada com sucesso! Seus créditos foram carregados em ${formattedBalance}.`,
      skin_id: data.skin.id,
    };

    return sellerNotification;
  }

  createBuyerNotification(
    data: IComposeOwnerIdUpdates,
    isTransactionFailed: boolean,
    formattedBalance: string
  ) {
    const buyerNotification = {
      owner_id: data.updateConfirm.buyer_id,
      description: isTransactionFailed
        ? `A compra do item ${data.skin.skin_name} foi cancelada. ${formattedBalance} foram restaurados em seus créditos.`
        : `A compra do item ${data.skin.skin_name} foi realizada com sucesso! Verifique o item em seu inventário.`,
      skin_id: data.skin.id,
    };

    return buyerNotification;
  }

  async handleFailedTransaction(
    ownerId: string,
    data: IComposeOwnerIdUpdates,
    sellerNotification: any,
    buyerNotification: any
  ) {
    const perfil = await this.perfilRepository.findByUser(ownerId);

    if (perfil) {
      return [
        this.walletRepository.updateByUserValue(
          ownerId,
          "increment",
          data.findTransaction.balance
        ),
        this.perfilRepository.updateByUser(ownerId, {
          total_exchanges_failed: perfil.total_exchanges_failed + 1,
        }),
        this.notificationsRepository.create(sellerNotification),
        this.transactionRepository.updateId(data.findTransaction.id, {
          status: "Falhou",
        }),
        this.notificationsRepository.create(buyerNotification),
        this.skinRepository.updateById(data.updateConfirm.skin_id, {
          status: "Falhou",
        }),
      ];
    }
  }

  async handleSuccessfulTransaction(
    ownerId: string,
    data: IComposeOwnerIdUpdates,
    newBalance: number,
    sellerNotification: any,
    buyerNotification: any
  ) {
    const perfil = await this.perfilRepository.findByUser(ownerId);

    const updates = [
      this.walletRepository.updateByUserValue(ownerId, "increment", newBalance),
      this.perfilRepository.updateByUser(ownerId, {
        total_exchanges_completed: perfil.total_exchanges_completed + 1,
      }),

      this.transactionRepository.updateId(data.id, {
        salesAt: new Date(),
        status: "Concluído",
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

    return Promise.all(updates);
  }

  formatBalance(balance: number) {
    return balance.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  }
}
