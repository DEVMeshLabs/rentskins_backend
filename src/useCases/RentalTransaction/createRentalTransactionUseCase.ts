import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { addHours } from "@/utils/compareDates";
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
    const [perfilComprador, walletComprador] = await Promise.all([
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
    }

    // const { remainder, fee_total_price } = this.calculateFee(
    //   data.daysQuantity,
    //   skin.skin_price
    // );

    const endDateNew = dayjs(new Date())
      .add(Number(data.daysQuantity), "day")
      .format();

    const [rental] = await Promise.all([
      this.rentalTransactionRepository.create({
        ...data,
        totalPriceRent: data.totalPriceRent,
        remainder: 10,
        feePrice: 20,
        startDate: new Date(),
        endDate: endDateNew,
        skins: data.skins,
      }),

      // this.notificationsRepository.create({
      //   owner_id: perfilSeller.id,
      //   description: `A transação do item ${skin.skin_name} foi iniciada.`,
      //   type: "Input",
      //   skin_id: skin.id,
      // }),

      // this.notificationsRepository.create({
      //   owner_id: perfilComprador.id,
      //   description: `A transação do item ${skin.skin_name} foi iniciada.`,
      //   type: "Input",
      //   skin_id: skin.id,
      // }),

      // this.walletRepository.updateByUserValue(
      //   data.buyerId,
      //   "decrement",
      //   data.totalPriceRent
      // ),
      // this.perfilRepository.updateByUser(perfilSeller.owner_id, {
      //   total_exchanges: perfilSeller.total_exchanges + 1,
      // }),
      // this.skinRepository.updateById(data.skin_id, {
      //   status: "Em andamento",
      // }),
    ]);
    await this.transactionHistory.create({
      rentalTransaction_id: rental.id,
      seller_id: data.sellerId,
      buyer_id: data.buyerId,
      asset_id: data.buyerId,
      dateProcess: addHours(24 * Number(rental.daysQuantity)),
    });
    return rental;
  }

  // ------------------------- Outras funções -------------------------

  calculateFee(days_quantity: string, skin_price: number) {
    const feeQuantityDays = {
      10: 10,
      20: 18,
      30: 23,
    };

    const fee = feeQuantityDays[days_quantity];

    const fee_total_price = skin_price - (fee / 100) * skin_price;
    const remainder = (fee / 100) * skin_price;

    return {
      remainder,
      fee_total_price,
    };
  }
}
