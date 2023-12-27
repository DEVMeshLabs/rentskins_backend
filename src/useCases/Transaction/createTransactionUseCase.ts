import { Perfil, Skin, Transaction } from "@prisma/client";
import { env } from "@/env";
import schedule from "node-schedule";
import axios from "axios";
// ------------------ Repositorys -----------------
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
// ------------------ Errors -----------------
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import { SameUsersError } from "../@errors/Skin/SameUsersError";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";
import { InsufficientFundsError } from "../@errors/Wallet/InsufficientFundsError";
import { CannotAdvertiseSkinNotYour } from "../@errors/Transaction/CannotAdvertiseSkinNotYour";
import { SkinHasAlreadyBeenSoldError } from "../@errors/Transaction/SkinHasAlreadyBeenSoldError";
import { WalletNotExistsError } from "../@errors/Wallet/WalletNotExistsError";
import { GetInventoryOwnerIdError } from "../@errors/Transaction/GetInventoryOwnerIdError";
// ------------------ Outros -----------------
import { makeComposeOwnerId } from "../@factories/Transaction/makeComposeOwnerId";
import { Trades } from "@/utils/trades";
import { getFormattedDateArray } from "@/utils/getFormattedDate";

interface ITransactionRequest {
  seller_id: string;
  buyer_id: string;
  skin_id: string;
}

export class CreateTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private perfilRepository: IPerfilRepository,
    private skinRepository: ISkinsRepository,
    private walletRepository: IWalletRepository,
    private notificationsRepository: INotificationRepository,
    private configurationRepository: IConfigurationRepository
  ) {}

  async execute({ seller_id, buyer_id, skin_id }: ITransactionRequest) {
    const [
      perfilBuyer,
      perfilSeller,
      findSkin,
      findWallet,
      findSkinTransaction,
    ] = await Promise.all([
      this.perfilRepository.findByUser(buyer_id),
      this.perfilRepository.findByUser(seller_id),
      this.skinRepository.findById(skin_id),
      this.walletRepository.findByUser(buyer_id),
      this.transactionRepository.findBySkinTransaction(skin_id),
    ]);

    if (!perfilBuyer || !perfilSeller) {
      throw new PerfilNotExistError();
    } else if (perfilBuyer === perfilSeller) {
      throw new SameUsersError();
    } else if (!findSkin) {
      throw new SkinNotExistError();
    } else if (!findWallet) {
      throw new WalletNotExistsError();
    } else if (findWallet.value < findSkin.skin_price) {
      throw new InsufficientFundsError();
    } else if (findSkin.seller_id !== seller_id) {
      throw new CannotAdvertiseSkinNotYour();
    } else if (findSkinTransaction) {
      throw new SkinHasAlreadyBeenSoldError(
        `${findSkin.skin_name} ${findSkin.asset_id}`
      );
    }

    const formattedBalance = findSkin.skin_price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });

    const [createTransaction] = await Promise.all([
      this.transactionRepository.create({
        skin_id,
        seller_id,
        buyer_id,
        balance: findSkin.skin_price,
      }),

      this.notificationsRepository.create({
        owner_id: perfilSeller.owner_id,
        description: `A transação do item ${findSkin.skin_name} foi iniciada por ${formattedBalance}.`,
        type: "Input",
        skin_id: findSkin.id,
      }),

      this.notificationsRepository.create({
        owner_id: perfilBuyer.owner_id,
        description: `A transação do item ${findSkin.skin_name} foi iniciada por ${formattedBalance}.`,
        type: "Input",
        skin_id: findSkin.id,
      }),

      this.walletRepository.updateByUserValue(
        perfilBuyer.owner_id,
        "decrement",
        findSkin.skin_price
      ),
    ]);

    await this.perfilRepository.updateByUser(perfilSeller.owner_id, {
      total_exchanges: perfilSeller.total_exchanges + 1,
    });
    await this.skinRepository.updateById(skin_id, {
      status: "Em andamento",
    });

    // seconds, minutes, hours, dayOfMonth, month, dayOfYear
    const [seconds, minutes, hours, day, month] = getFormattedDateArray(
      0,
      5,
      0,
      0
    );

    schedule.scheduleJob(
      `${seconds} ${minutes} ${hours} ${day} ${month} *`,
      async () => {
        console.log("INICIANDO CRONN");
        try {
          await this.processTransaction(
            createTransaction,
            findSkin,
            perfilBuyer,
            perfilSeller
          );
        } catch (error) {
          console.log(error);
        }
        console.log("FINALIZANDOO CRONN");
      }
    );

    return createTransaction;
  }

  async processTransaction(
    createTransaction: Transaction,
    findSkin: Skin,
    perfilBuyer: Perfil,
    perfilSeller: Perfil
  ): Promise<void> {
    console.log("Executando processTransaction");

    const makeCompose = makeComposeOwnerId();

    const findTransaction = await this.transactionRepository.findById(
      createTransaction.id
    );

    if (findTransaction.status === "Em andamento") {
      console.log("Verificando o inventario do Vendedor com a KEY");

      const configurationSeller = await this.configurationRepository.findByUser(
        findTransaction.seller_id
      );

      const configurationBuyer = await this.configurationRepository.findByUser(
        findTransaction.buyer_id
      );

      const hasSellerKey = !!configurationSeller.key;
      const hasBuyerKey = !!configurationBuyer.key;

      const tradeUserId = hasSellerKey
        ? findTransaction.buyer_id
        : findTransaction.seller_id;

      const tradeKey = hasSellerKey
        ? configurationSeller.key
        : configurationBuyer.key;

      if (hasBuyerKey || hasSellerKey) {
        const trades = await Trades.filterTradeHistory(
          tradeUserId,
          tradeKey,
          findSkin.asset_id,
          ""
        );
        if (trades) {
          return makeCompose.composeOwnerIdUpdates(
            perfilSeller.owner_id,
            false,
            {
              transactionId: createTransaction.id,
              findTransaction,
              updateConfirm: createTransaction,
              skin: findSkin,
            }
          );
        }
      }

      console.log("Verificando o inventario do Vendedor SEM A KEY");

      const getInventorySeller = await this.getOwnerInventory(
        perfilSeller.owner_id
      );

      if (Error instanceof GetInventoryOwnerIdError) {
        console.log("Deu ruim");
        return;
      }

      const isAlreadyExistSkinInventory = getInventorySeller.some(
        (item: any) => {
          return item.assetid === findSkin.asset_id;
        }
      );

      if (isAlreadyExistSkinInventory) {
        console.log("Atualizando a wallet do vendedor");
        return makeCompose.composeOwnerIdUpdates(perfilBuyer.owner_id, true, {
          transactionId: createTransaction.id,
          findTransaction,
          updateConfirm: createTransaction,
          skin: findSkin,
        });
      } else {
        console.log("Verificando o inventario do comprador");

        const getInventoryBuyer = await this.getOwnerInventory(
          perfilBuyer.owner_id
        );

        const filterStorageUnit =
          getInventoryBuyer ??
          getInventoryBuyer.filter(
            (item: any) => item.market_name === "Storage Unit"
          );

        if (
          (getInventoryBuyer.message === "Error" &&
            !getInventoryBuyer.err.code) ||
          filterStorageUnit
        ) {
          await this.transactionRepository.updateId(findTransaction.id, {
            status: "Em análise",
          });

          console.log("Atualizando Status!");
          return;
        }
        const isAlreadyExistSkinInventoryBuyer = getInventoryBuyer.some(
          (item: any) => item.market_name === findSkin.skin_name
        );

        if (!isAlreadyExistSkinInventoryBuyer) {
          console.log("Atualizando a wallet do comprador");

          const buyer = await makeCompose.composeOwnerIdUpdates(
            perfilBuyer.owner_id,
            true,
            {
              transactionId: createTransaction.id,
              findTransaction,
              updateConfirm: createTransaction,
              skin: findSkin,
            }
          );

          const buyerAll = await Promise.all([...buyer]);
          return buyerAll;
        }
      }
    }
  }

  async getOwnerInventory(ownerId: string): Promise<any> {
    console.log("Entrou");
    try {
      const isValidEnv =
        env.NODE_ENV === "production"
          ? "https://api-rentskin-backend-on.onrender.com"
          : "http://localhost:3333";

      const response = await axios.get(
        `${isValidEnv}/v1/skins/inventory/${ownerId}?tudo=false`
      );

      if (response.data.message === "Error" && response.data.err.code) {
        throw new GetInventoryOwnerIdError();
      }

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}
