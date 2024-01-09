import { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";
import { Perfil, Prisma, RentalTransaction, Skin } from "@prisma/client";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { SkinHasAlreadyBeenAnnounced } from "../@errors/RentalTransaction/SkinHasAlreadyBeenAnnounced";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { WalletNotExistsError } from "../@errors/Wallet/WalletNotExistsError";
import { InsufficientFundsError } from "../@errors/Wallet/InsufficientFundsError";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";

interface IComposeOwnerIdUpdates {
  perfil: Perfil;
  skin: Skin;
  rentalTransaction: RentalTransaction;
  buyerNotification: any;
  sellerNotification: any;
}

export class CreateRentalTransactionUseCase {
  constructor(
    private rentalTransactionRepository: IRentalTransactionRepository,
    private skinRepository: ISkinsRepository,
    private perfilRepository: IPerfilRepository,
    private walletRepository: IWalletRepository,
    private notificationsRepository: INotificationRepository
  ) {}

  async execute(data: Prisma.RentalTransactionCreateInput) {
    const [skin, skinRentalTransaction, perfilComprador, walletComprador] =
      await Promise.all([
        this.skinRepository.findById(data.skin_id),
        this.rentalTransactionRepository.findBySkinRentalTransaction(
          data.skin_id
        ),
        this.perfilRepository.findByUser(data.owner_id),
        this.walletRepository.findByUser(data.owner_id),
      ]);

    if (!skin) {
      throw new SkinNotExistError();
    } else if (skinRentalTransaction) {
      throw new SkinHasAlreadyBeenAnnounced();
    } else if (!perfilComprador) {
      throw new PerfilNotExistError();
    } else if (!walletComprador) {
      throw new WalletNotExistsError();
    } else if (walletComprador.value < skin.skin_price) {
      throw new InsufficientFundsError();
    }

    const endDate = new Date().setDate(
      new Date().getDate() + Number(data.days_quantity)
    );
    const endDateNew = new Date(endDate);

    const rental = await this.rentalTransactionRepository.create({
      ...data,
      start_date: new Date(),
      end_date: endDateNew,
    });

    // Notificações

    const buyerNotification = this.createBuyerNotification(
      data.owner_id,
      skin,
      false
    );

    const sellerNotification = this.createSellerNotification(
      skin.seller_id,
      skin,
      false
    );

    // Atualizando dados do comprador e vendedor
    const vendedor = await this.perfilRepository.findByUser(skin.seller_id);
    await this.handleProgressRentalTransaction(data.owner_id, {
      perfil: vendedor,
      skin,
      rentalTransaction: rental,
      sellerNotification,
      buyerNotification,
    });

    return rental;
  }

  // ------------------------- Outras funções -------------------------
  async handleProgressRentalTransaction(
    owner_id: string,
    data: IComposeOwnerIdUpdates
  ) {
    const { perfil, skin } = data;

    const updates = [
      this.walletRepository.updateByUserValue(
        owner_id,
        "decrement",
        skin.skin_price
      ),
      this.perfilRepository.updateByUser(skin.seller_id, {
        total_exchanges: perfil.total_exchanges + 1,
      }),
      this.notificationsRepository.create({
        owner_id,
        description: `O aluguel do item ${skin.skin_name} foi realizado com sucesso!`,
        skin_id: skin.id,
      }),
      this.notificationsRepository.create({
        owner_id: skin.seller_id,
        description: `O aluguel do item ${skin.skin_name} foi realizada com sucesso!`,
        skin_id: skin.id,
      }),
      this.skinRepository.updateById(skin.id, {
        status: "Em andamento",
      }),
    ];

    return Promise.all(updates);
  }

  async handleSuccessfulTransaction(
    owner_id: string,
    data: IComposeOwnerIdUpdates
  ) {
    const { perfil, skin, buyerNotification, sellerNotification } = data;

    const updates = [
      this.walletRepository.updateByUserValue(owner_id, "increment", 526),
      this.perfilRepository.updateByUser(owner_id, {
        total_exchanges_completed: perfil.total_exchanges_completed + 1,
      }),
      this.notificationsRepository.create(buyerNotification),
      this.notificationsRepository.create(sellerNotification),
      this.skinRepository.updateById(skin.id, {
        status: "Concluído",
        saledAt: new Date(),
      }),
      this.rentalTransactionRepository.updateId(data.rentalTransaction.id, {
        status: "Concluído",
      }),
    ];

    return Promise.all(updates);
  }

  // async handleSuccessfulTransaction(
  //   ownerId: string,
  //   data: IComposeOwnerIdUpdates,
  //   newBalance: number,
  //   sellerNotification: any,
  //   buyerNotification: any
  // ) {
  //   const perfil = await this.perfilRepository.findByUser(ownerId);

  //   const updates = [
  //     this.walletRepository.updateByUserValue(ownerId, "increment", newBalance),
  //     this.perfilRepository.updateByUser(ownerId, {
  //       total_exchanges_completed: perfil.total_exchanges_completed + 1,
  //     }),

  //     this.rentalTransactionRepository.updateId(data.id, {
  //       salesAt: new Date(),
  //       status: "Concluído",
  //     }),
  //     this.perfilRepository.updateByUser(ownerId, {
  //       delivery_time: data.mediaDate,
  //     }),

  //     this.notificationsRepository.create(sellerNotification),
  //     this.notificationsRepository.create(buyerNotification),
  //     this.skinRepository.updateById(data.updateConfirm.skin_id, {
  //       status: "Concluído",
  //       saledAt: new Date(),
  //     }),
  //   ];

  //   return Promise.all(updates);
  // }

  createBuyerNotification(
    owner_id: string,
    skin: Skin,
    isTransactionFailed: boolean
  ) {
    const buyerNotification = {
      owner_id,
      description: isTransactionFailed
        ? `O aluguel do item ${skin.skin_name} foi cancelado. foram restaurados em seus créditos.`
        : `O aluguel do item ${skin.skin_name} foi realizado com sucesso! Verifique o item em seu inventário.`,
      skin_id: skin.id,
    };

    return buyerNotification;
  }

  createSellerNotification(
    owner_id: string,
    skin: Skin,
    isTransactionFailed: boolean
  ) {
    const sellerNotification = {
      owner_id,
      description: isTransactionFailed
        ? `O aluguel do item ${skin.skin_name} foi cancelada. Conclua as trocas com honestidade ou sua conta receberá uma punição.`
        : `O aluguel do item ${skin.skin_name} foi realizada com sucesso! Seus créditos foram carregados em $ .`,
      skin_id: skin.id,
    };

    return sellerNotification;
  }
}
