import {
  Prisma,
  type GuaranteeSkin,
  type RentalTransaction,
  type Skin,
} from "@prisma/client";
// ----------------------------------- Importando Repositórios -----------------------------------//
import { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
// ----------------------------------- Importando Errors -----------------------------------//
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import { WalletNotExistsError } from "../@errors/Wallet/WalletNotExistsError";
import { InsufficientFundsError } from "../@errors/Wallet/InsufficientFundsError";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";
// ----------------------------------- Importando Utils -----------------------------------//
import { addHours } from "@/utils/compareDates";
import { SameUsersError } from "../@errors/Skin/SameUsersError";
import type { ISkinGuaranteeRepository } from "@/repositories/interfaceRepository/ISkinGuarantee";

interface SkinGuaranteWithRentalTransaction extends GuaranteeSkin {
  RentalTransaction: RentalTransaction;
}

export class CreateTransactionRentalUseCase {
  constructor(
    private rentalTransactionRepository: IRentalTransactionRepository,
    private transactionHistory: ITransactionHistoryRepository,
    private skinRepository: ISkinsRepository,
    private skinGuaranteeRepository: ISkinGuaranteeRepository,
    private perfilRepository: IPerfilRepository,
    private walletRepository: IWalletRepository,
    private notificationsRepository: INotificationRepository
  ) {}

  async execute(data: Prisma.RentalTransactionCreateInput) {
    const sellerItemsMap = new Map<string, string[]>();
    // const assetIds = (data.skinsGuarantee as GuaranteeSkin[]).map(
    //   (item) => item.asset_id
    // );
    // const skinsGuarantee = await this.skinGuaranteeRepository.findByAssets(
    //   assetIds
    // );

    const skinIds = (data.skinsRent as Skin[]).map((skin: Skin) => skin.id);
    const [skins, perfilComprador, walletComprador] = await Promise.all([
      this.skinRepository.findManySkins(skinIds),
      this.perfilRepository.findByUser(data.buyerId),
      this.walletRepository.findByUser(data.buyerId),
    ]);

    const isSellerToBuyer = (data.skinsRent as Skin[]).some((item: Skin) => {
      return item.seller_id === data.buyerId;
    });

    if (!perfilComprador) {
      throw new PerfilNotExistError();
    } else if (!walletComprador) {
      throw new WalletNotExistsError();
    } else if (walletComprador.value < data.totalPriceRent) {
      throw new InsufficientFundsError();
    } else if (
      skins.length !== (data.skinsRent as Skin[]).length ||
      (data.skinsRent as Skin[]).length < 1
    ) {
      throw new SkinNotExistError();
    } else if (isSellerToBuyer) {
      throw new SameUsersError();
    }

    // const skinsGuaranteeFiltered = [];

    // if (skinsGuarantee.length > 0) {
    //   const filterFailedOrCompleted = skinsGuarantee.filter(
    //     (item: SkinGuaranteWithRentalTransaction) => {
    //       if (
    //         item.RentalTransaction.status !== "Failed" &&
    //         item.RentalTransaction.status !== "Completed"
    //       ) {
    //         throw new Error(
    //           `A garantia do item ${item.skin_name} já está em andamento.`
    //         );
    //       }
    //       return true;
    //     }
    //   );
    //   skinsGuaranteeFiltered.push(...filterFailedOrCompleted);
    //   return skinsGuaranteeFiltered;
    // }

    skins.forEach((skin) => {
      if (!sellerItemsMap.has(skin.seller_id)) {
        sellerItemsMap.set(skin.seller_id, []);
      }
      sellerItemsMap.get(skin.seller_id)?.push(skin.skin_name);
    });

    try {
      const [rent] = await Promise.all([
        this.rentalTransactionRepository.create({
          ...data,
          totalPriceRent: data.totalPriceRent,
          skinsRent: {
            connect: (data.skinsRent as Skin[]).map((skin) => ({
              id: skin.id,
            })),
          },
          skinsGuarantee: {
            createMany: {
              data: (data.skinsGuarantee as GuaranteeSkin[]).map((skin) => {
                return {
                  ...skin,
                  owner_id: data.buyerId,
                  skin_wear: skin.skin_wear ?? "",
                };
              }),
            },
          },
        }),

        sellerItemsMap.forEach((itemNames, sellerId) => {
          const description = `A locação dos itens ${itemNames.join(
            ", "
          )} foi iniciada.`;
          this.notificationsRepository.create({
            description,
            type: "input",
            owner_id: sellerId,
          });

          this.transactionHistory.create({
            seller_id: sellerId,
            buyer_id: data.buyerId,
            skins: {
              connect: (data.skinsRent as Skin[]).map((skin) => ({
                id: skin.id,
              })),
            },
            dateProcess: addHours(24 * Number(data.daysQuantity)),
          });
        }),

        this.walletRepository.updateByUserValue(
          data.buyerId,
          "decrement",
          data.totalPriceRent
        ),
        this.perfilRepository.updateTotalExchanges(
          skins.map((skin) => skin.seller_id)
        ),
        this.skinRepository.updateMany(
          skins.map((skin) => skin.id),
          "Em andamento"
        ),
      ]);
      return rent;
    } catch (error) {
      console.log(error);
    }
  }
}
