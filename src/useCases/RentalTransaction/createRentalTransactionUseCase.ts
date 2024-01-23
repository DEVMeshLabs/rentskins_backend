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
import { filterTradeHistory } from "@/utils/trades";
import { getTratarDateRental } from "@/utils/getTratarDateRental";
import schedule from "node-schedule";
import dayjs from "dayjs";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import axios from "axios";
import { env } from "@/env";

interface IComposeOwnerIdUpdates {
  perfil: Perfil;
  skin: Skin;
  rentalTransaction?: RentalTransaction;
  sellerNotification?: any;
  buyerNotification?: any;
}

export class CreateRentalTransactionUseCase {
  constructor(
    private rentalTransactionRepository: IRentalTransactionRepository,
    private skinRepository: ISkinsRepository,
    private perfilRepository: IPerfilRepository,
    private walletRepository: IWalletRepository,
    private notificationsRepository: INotificationRepository,
    private configurationRepository: IConfigurationRepository
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

    const { fee, fee_total_price, commission_rent, seller_total_price } =
      this.calculateFee(data.days_quantity, skin.skin_price);

    const endDateNew = dayjs(new Date()).add(7, "day").format();
    const createRentalTransaction =
      await this.rentalTransactionRepository.create({
        ...data,
        total_price: skin.skin_price,
        fee,
        fee_total_price,
        seller_total_price,
        commission_rent,
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
      rentalTransaction: createRentalTransaction,
      sellerNotification,
      buyerNotification,
    });

    await this.notification12hBefore(data.owner_id, endDateNew, skin);
    await this.deadLine(data.owner_id, endDateNew, skin);

    return createRentalTransaction;
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
    const perfil = await this.perfilRepository.findByUser(owner_id);
    const skin = await this.skinRepository.findById(data.skin.id);

    const rentalTransaction =
      await this.rentalTransactionRepository.findBySkinRentalTransaction(
        skin.id
      );

    console.log("AQUI", rentalTransaction);

    const updates = [
      this.walletRepository.updateByUserValue(
        owner_id,
        "increment",
        rentalTransaction.fee_total_price
      ),
      this.walletRepository.updateByUserValue(
        skin.seller_id,
        "increment",
        rentalTransaction.commission_rent
      ),

      this.perfilRepository.updateByUser(owner_id, {
        total_exchanges_completed: perfil.total_exchanges_completed + 1,
      }),
      this.notificationsRepository.create({
        owner_id,
        description: `O tempo limite do aluguel da skin ${skin.skin_name} chegou ao fim! Devolva o item.`,
        skin_id: skin.id,
      }),
      this.notificationsRepository.create({
        owner_id: skin.seller_id,
        description: `O aluguel da skin ${skin.skin_name} chegou ao fim! Sua conta foi creditada com ${rentalTransaction.fee_total_price}`,
        skin_id: skin.id,
      }),
      this.skinRepository.updateById(skin.id, {
        status: "Concluído",
        saledAt: new Date(),
      }),
      this.rentalTransactionRepository.updateId(rentalTransaction.id, {
        status: "Concluído",
      }),
    ];

    return Promise.all(updates);
  }

  createBuyerNotification(
    owner_id: string,
    skin: Skin,
    isTransactionFailed: boolean
  ) {
    const buyerNotification = {
      owner_id,
      description: isTransactionFailed
        ? `O aluguel do item ${skin.skin_name} foi cancelado. foram restaurados em seus créditos.`
        : `O tempo limite do aluguel da skin ${skin.skin_name} chegou ao fim! Devolva o item`,
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

  calculateFee(days_quantity: string, skin_price: number) {
    const feeQuantityDays = {
      7: 10,
      14: 18,
      21: 23,
    };

    const fee = feeQuantityDays[days_quantity];

    const fee_total_price = skin_price - (fee / 100) * skin_price;
    const sellerPrice = (fee / 100) * skin_price;

    const rent_comission = sellerPrice - (fee / 100) * fee_total_price;
    const commission_rent = Number(rent_comission.toFixed(2));

    const seller_total_price = sellerPrice - commission_rent;

    return {
      fee: `${fee}%`,
      fee_total_price,
      seller_total_price,
      commission_rent,
    };
  }

  async checkInventory(
    ownerId: string,
    skin: Skin,
    configurationSeller,
    configurationBuyer,
    perfil
  ) {
    const hasSellerKey = !!configurationSeller.key;
    const hasBuyerKey = !!configurationBuyer.key;
    // const tradeUserId = hasSellerKey ? ownerId : skin.seller_id;

    // const tradeKey = hasSellerKey
    //   ? configurationSeller.key
    //   : configurationBuyer.key;

    // tradeId = 5931870240083447536
    // steamId_other = 76561198015724229
    // assetid = 35291538180
    // key = 9DE77D4A568AE81B8975E54BFE1DC8C9

    if (hasSellerKey || hasBuyerKey) {
      // const trades = await Trades.filterTradeHistory(
      //   tradeUserId,
      //   tradeKey,
      //   skin.asset_id
      // );

      const trades = await filterTradeHistory(
        "76561198015724229",
        "9DE77D4A568AE81B8975E54BFE1DC8C9",
        "35291538180"
      );
      console.log(trades);
      if (trades && trades.length > 0) {
        const teste = await this.handleSuccessfulTransaction(ownerId, {
          perfil,
          skin,
        });
        console.log(teste);
        return teste;
      }
    }
  }

  async notification12hBefore(owner_id: string, date: string, skin: Skin) {
    const endDateRental = getTratarDateRental(date, true);
    return schedule.scheduleJob(endDateRental, async () => {
      try {
        return this.notificationsRepository.create({
          owner_id,
          description: `O tempo limite do aluguel da skin ${skin.skin_name} está chegando ao fim! Devolva o item`,
          skin_id: skin.id,
          type: "input",
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  async deadLine(owner_id: string, date: string, skin: Skin) {
    const endDateRental = getTratarDateRental(date, false);
    // const configurationSeller = await this.configurationRepository.findByUser(
    //   skin.seller_id
    // );
    // const configurationBuyer = await this.configurationRepository.findByUser(
    //   owner_id
    // );
    // const perfil = await this.perfilRepository.findByUser(owner_id);

    // const key = "9DE77D4A568AE81B8975E54BFE1DC8C9";

    schedule.scheduleJob(endDateRental, async () => {
      try {
        await callExternalAPI();
      } catch (error) {
        console.log("Error: ", error);
        return error;
      }
    });
  }
}

async function callExternalAPI() {
  try {
    console.log("Aqui");
    const { data } = await axios.get(
      `https://api.steampowered.com/IEconService/GetTradeHistory/v1/?key=${env.KEY_STEAM}&max_trades=50&get_descriptions=false&language=EN&include_failed=true&include_total=true`
    );
    console.log("Data: ", data);
    return data;
  } catch (error) {
    console.log("Error: ", error);
    return error;
  }
}

// await this.checkInventory(
//   owner_id,
//   skin,
//   configurationSeller,
//   configurationBuyer,
//   perfil
// );
