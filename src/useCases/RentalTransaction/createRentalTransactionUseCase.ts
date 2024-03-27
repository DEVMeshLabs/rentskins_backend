import { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";
import { Prisma } from "@prisma/client";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { SkinHasAlreadyBeenAnnounced } from "../@errors/RentalTransaction/SkinHasAlreadyBeenAnnounced";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { WalletNotExistsError } from "../@errors/Wallet/WalletNotExistsError";
import { InsufficientFundsError } from "../@errors/Wallet/InsufficientFundsError";
import dayjs from "dayjs";
import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
import { addHours } from "@/utils/compareDates";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";

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
    const [
      skin,
      skinRentalTransaction,
      perfilComprador,
      perfilSeller,
      walletComprador,
    ] = await Promise.all([
      this.skinRepository.findById(data.skin_id),
      this.rentalTransactionRepository.findBySkinRentalTransaction(
        data.skin_id
      ),
      this.perfilRepository.findByUser(data.buyer_id),
      this.perfilRepository.findByUser(data.seller_id),
      this.walletRepository.findByUser(data.buyer_id),
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

    const { remainder, fee_total_price } = this.calculateFee(
      data.days_quantity,
      skin.skin_price
    );
    const endDateNew = dayjs(new Date())
      .add(Number(data.days_quantity), "day")
      .format();

    const [rental] = await Promise.all([
      this.rentalTransactionRepository.create({
        ...data,
        total_price: skin.skin_price,
        remainder,
        fee_total_price,
        start_date: new Date(),
        end_date: endDateNew,
      }),

      this.notificationsRepository.create({
        owner_id: perfilSeller.id,
        description: `A transação do item ${skin.skin_name} foi iniciada.`,
        type: "Input",
        skin_id: skin.id,
      }),

      this.notificationsRepository.create({
        owner_id: perfilComprador.id,
        description: `A transação do item ${skin.skin_name} foi iniciada.`,
        type: "Input",
        skin_id: skin.id,
      }),

      this.walletRepository.updateByUserValue(
        data.buyer_id,
        "decrement",
        skin.skin_price
      ),
      this.perfilRepository.updateByUser(perfilSeller.owner_id, {
        total_exchanges: perfilSeller.total_exchanges + 1,
      }),
      this.skinRepository.updateById(data.skin_id, {
        status: "Em andamento",
      }),
    ]);
    await this.transactionHistory.create({
      rentalTransaction_id: rental.id,
      seller_id: data.seller_id,
      buyer_id: data.buyer_id,
      asset_id: skin.asset_id,
      dateProcess: addHours(24 * (Number(rental.days_quantity) + 1)),
    });
    return rental;
  }

  // ------------------------- Outras funções -------------------------

  calculateFee(days_quantity: string, skin_price: number) {
    const feeQuantityDays = {
      7: 10,
      14: 18,
      21: 23,
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
