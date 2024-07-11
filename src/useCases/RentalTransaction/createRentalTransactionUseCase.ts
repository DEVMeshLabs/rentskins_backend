import { Prisma, type Skin } from "@prisma/client";
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
import dayjs from "dayjs";
import { prisma } from "@/lib/prisma";

export class CreateRentalTransactionUseCase {
  constructor(
    private rentalTransactionRepository: IRentalTransactionRepository,
    private transactionHistory: ITransactionHistoryRepository,
    private skinRepository: ISkinsRepository,
    private perfilRepository: IPerfilRepository,
    private walletRepository: IWalletRepository,
    private notificationsRepository: INotificationRepository
  ) {}

  async execute(data: Prisma.RentalTransactionCreateInput) {
    console.log(data.skins);

    const skinIds = (data.skins as Skin[]).map((skin: Skin) => skin.id);
    const [skins, perfilComprador, walletComprador, perfilSeller] =
      await Promise.all([
        this.skinRepository.findManySkins(skinIds),
        this.perfilRepository.findByUser(data.buyerId),
        this.walletRepository.findByUser(data.buyerId),
        this.perfilRepository.findByUser(data.sellerId),
      ]);

    if (!perfilComprador) {
      throw new PerfilNotExistError();
    } else if (!walletComprador) {
      throw new WalletNotExistsError();
    } else if (walletComprador.value < data.totalPriceRent) {
      throw new InsufficientFundsError();
    } else if (
      skins.length !== (data.skins as Skin[]).length ||
      (data.skins as Skin[]).length < 1
    ) {
      throw new SkinNotExistError();
    }

    const endDateNew = dayjs(new Date())
      .add(Number(data.daysQuantity), "day")
      .format();

    const rentalTransaction = await prisma.$transaction(async (prisma) => {
      await Promise.all([
        this.rentalTransactionRepository.create({
          ...data,
          totalPriceRent: data.totalPriceRent,
          startDate: new Date(),
          endDate: endDateNew,
          skins: {
            connect: (data.skins as Skin[]).map((skin) => ({
              id: skin.id,
            })),
          },
          notification: {
            createMany: {
              data: [
                {
                  description: `A locação do(s) item(ns) foi iniciada.`,
                  type: "input",
                  owner_id: data.buyerId,
                },
                {
                  description: `A locação do(s) item(ns) foi iniciada.`,
                  type: "input",
                  owner_id: data.sellerId,
                },
              ],
            },
          },
          transactionHistory: {
            create: {
              seller_id: data.sellerId,
              buyer_id: data.buyerId,
              skins: {
                connect: (data.skins as Skin[]).map((skin) => ({
                  id: skin.id,
                })),
              },
              dateProcess: addHours(24 * Number(data.daysQuantity)),
            },
          },
        }),

        this.walletRepository.updateByUserValue(
          data.buyerId,
          "decrement",
          data.totalPriceRent
        ),
        this.perfilRepository.updateByUser(perfilSeller.owner_id, {
          total_exchanges: perfilSeller.total_exchanges + 1,
        }),
        this.skinRepository.updateMany(
          skins.map((skin) => skin.id),
          "Em andamento"
        ),
      ]);
    });

    return rentalTransaction;
  }
}
