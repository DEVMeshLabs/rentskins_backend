import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import { SameUsersError } from "../@errors/Skin/SameUsersError";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { InsufficientFundsError } from "../@errors/Wallet/InsufficientFundsError";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { CannotAdvertiseSkinNotYour } from "../@errors/Transaction/CannotAdvertiseSkinNotYour";
import { SkinHasAlreadyBeenSoldError } from "../@errors/Transaction/SkinHasAlreadyBeenSoldError";
import { WalletNotExistsError } from "../@errors/Wallet/WalletNotExistsError";
import cron from "node-cron";
import axios from "axios";
import { env } from "@/env";

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
    private notificationsRepository: INotificationRepository
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
      throw new SkinHasAlreadyBeenSoldError(findSkin.skin_name);
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
        owner_id: seller_id,
        description: `Venda do item ${findSkin.skin_name}, realizada por ${formattedBalance}.`,
        type: "Input",
        skin_id: findSkin.id,
      }),

      this.notificationsRepository.create({
        owner_id: buyer_id,
        description: `Compra do item ${findSkin.skin_name} realizada por ${formattedBalance}.`,
        type: "Input",
        skin_id: findSkin.id,
      }),

      this.walletRepository.updateByUserValue(
        buyer_id,
        "decrement",
        findSkin.skin_price
      ),

      this.perfilRepository.updateByUser(seller_id, {
        total_exchanges: perfilSeller.total_exchanges + 1,
      }),
    ]);

    await this.skinRepository.updateById(skin_id, {
      status: "Em andamento",
    });

    console.log("Bateu Aqui");
    cron.schedule(
      "* * 12 * * *",
      async () => {
        console.log("Iniciou");

        const findTransaction = await this.transactionRepository.findById(
          createTransaction.id
        );

        if (findTransaction.status === "Em andamento") {
          console.log("Verificando o inventario do vendedor");
          const inventario = await axios
            .get(`${env.URL_SITE}/v1/skins/inventory/${seller_id}`)
            .then((response) => response.data)
            .catch((err) => err.message);

          const isAlreadyExistSkinInventory = inventario.some((item: any) => {
            return item.assetid === findSkin.asset_id;
          });

          if (isAlreadyExistSkinInventory) {
            console.log("Atualizando a wallet do vendedor");
            // ---------- REFATORAR ------------------
            await Promise.all([
              this.walletRepository.updateByUserValue(
                buyer_id,
                "increment",
                findSkin.skin_price
              ),
              this.transactionRepository.updateId(createTransaction.id, {
                status: "Falhou",
              }),
              this.notificationsRepository.create({
                owner_id: seller_id,
                description: `O prazo de entrega do ${findSkin.skin_name} expirou, e a troca foi cancelada devido à não entrega.`,
                skin_id: findSkin.id,
              }),

              this.notificationsRepository.create({
                owner_id: buyer_id,
                description: `A compra do item ${findSkin.skin_name} foi cancelada porque o vendedor não enviou o item a tempo, e o valor foi reembolsado para a sua conta.`,
                skin_id: findSkin.id,
              }),

              this.skinRepository.updateById(findSkin.id, {
                status: "Falhou",
              }),
            ]);
            // ---------------------------------------
          } else if (!isAlreadyExistSkinInventory) {
            console.log("Verificando o inventario do comprador");
            const inventarioBuyer = await axios
              .get(`${env.URL_SITE}/v1/skins/inventory/${buyer_id}`)
              .then((response) => response.data)
              .catch((err) => err.message);

            const isAlreadyExistSkinInventoryBuyer = inventarioBuyer.some(
              (item: any) =>
                item.name === findSkin.skin_name &&
                item.market_name === findSkin.seller_name
            );

            if (!isAlreadyExistSkinInventoryBuyer) {
              console.log("Atualizando a wallet do comprador");
              await Promise.all([
                this.walletRepository.updateByUserValue(
                  buyer_id,
                  "increment",
                  findSkin.skin_price
                ),
                this.transactionRepository.updateId(createTransaction.id, {
                  status: "Falhou",
                }),
                this.notificationsRepository.create({
                  owner_id: seller_id,
                  description: `A venda do item ${findSkin.skin_name} foi cancelada.`,
                  skin_id: findSkin.id,
                }),

                this.notificationsRepository.create({
                  owner_id: buyer_id,
                  description: `A compra do item ${findSkin.skin_name} foi cancelada.`,
                  skin_id: findSkin.id,
                }),

                this.skinRepository.updateById(findSkin.id, {
                  status: "Falhou",
                }),
              ]);
            }
          }
        }

        console.log("Finalizando cron");
      },
      { name: `${createTransaction.id}` }
    );

    // cron.getTasks().get(createTransaction.id).stop();

    return createTransaction;
  }
}
