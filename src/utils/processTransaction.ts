import { Perfil, Skin, Transaction } from "@prisma/client";
import axios from "axios";
import { env } from "process";
import { Trades } from "./trades";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { GetInventoryOwnerIdError } from "@/useCases/@errors/Transaction/GetInventoryOwnerIdError";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { makeComposeOwnerId } from "@/useCases/@factories/Transaction/makeComposeOwnerId";

export class ProcessTransaction {
  constructor(
    private transactionRepository: ITransactionRepository,
    private configurationRepository: IConfigurationRepository
  ) {}

  async execute(
    createTransaction: Transaction,
    findSkin: Skin,
    perfilBuyer: Perfil,
    perfilSeller: Perfil,
    transactionRepo: any
  ): Promise<void> {
    console.log("Executando processTransaction");

    const makeCompose = makeComposeOwnerId();

    const findTransaction = await transactionRepo.findById(
      createTransaction.id
    );

    console.log(findTransaction);

    if (findTransaction.status === "Em andamento") {
      console.log("Verificando o inventario do Vendedor com a KEY");
      const configurationSeller = await this.configurationRepository.findByUser(
        findTransaction.seller_id
      );
      const configurationBuyer = await this.configurationRepository.findByUser(
        findTransaction.buyer_id
      );

      const sellerKeyValid =
        configurationSeller.key && configurationSeller.key !== "";
      const buyerKeyValid =
        configurationBuyer.key && configurationBuyer.key !== "";

      if (sellerKeyValid || buyerKeyValid) {
        const trades = await Trades.filterTradeHistory(
          sellerKeyValid ? perfilBuyer.owner_id : perfilSeller.owner_id,
          findSkin.asset_id,
          configurationSeller.key || configurationBuyer.key
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

      if (!getInventorySeller) {
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

  private async getOwnerInventory(ownerId: string): Promise<any> {
    try {
      const isValidEnv =
        env.NODE_ENV === "production"
          ? "https://api-rentskin-backend-on.onrender.com"
          : "http://localhost:3333";

      const response = await axios.get(
        `${isValidEnv}/v1/skins/inventory/${"76561198995872251"}?tudo=false`
      );

      if (response.data.message === "Error") {
        throw new GetInventoryOwnerIdError();
      }
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  //   async composeOwnerIdUpdates(
  //     ownerId: string,
  //     isTransactionFailed: boolean,
  //     data: IComposeOwnerIdUpdates,
  //     perfil?: Perfil
  //   ): Promise<any> {
  //     const { balance } = data.findTransaction;
  //     const formattedBalance = formatBalance(balance);
  //     const { newBalance } = calculateDiscount(data.updateConfirm.balance);
  //     const skinId = data.findTransaction.skin_id;
  //     const skinName = data.skin.skin_name;

  //     const sellerNotification = {
  //       owner_id: data.updateConfirm.seller_id,
  //       description: isTransactionFailed
  //         ? `A venda do item ${skinName} foi cancelada. Conclua as trocas com honestidade ou sua conta receberá uma punição.`
  //         : `A venda do item ${skinName} foi realizada com sucesso! Seus créditos foram carregados em ${formattedBalance}.`,
  //       skin_id: skinId,
  //     };

  //     const buyerNotification = {
  //       owner_id: data.updateConfirm.buyer_id,
  //       description: isTransactionFailed
  //         ? `A compra do item ${skinName} foi cancelada. ${formattedBalance} foram restaurados em seus créditos.`
  //         : `A compra do item ${skinName} foi realizada com sucesso! Verifique o item em seu inventário.`,
  //       skin_id: skinId,
  //     };

  //     if (isTransactionFailed) {
  //       return [
  //         this.walletRepository.updateByUserValue(
  //           ownerId,
  //           "increment",
  //           data.findTransaction.balance
  //         ),
  //         this.notificationsRepository.create(sellerNotification),
  //         this.transactionRepository.updateId(data.findTransaction.id, {
  //           status: "Falhou",
  //         }),
  //         this.notificationsRepository.create(buyerNotification),
  //         this.skinRepository.updateById(data.updateConfirm.skin_id, {
  //           status: "Falhou",
  //         }),
  //       ];
  //     } else {
  //       return [
  //         this.walletRepository.updateByUserValue(
  //           ownerId,
  //           "increment",
  //           newBalance
  //         ),
  //         this.perfilRepository.updateByUser(ownerId, {
  //           total_exchanges_completed: perfil.total_exchanges_completed + 1,
  //         }),

  //         this.transactionRepository.updateId(data.transactionId, {
  //           salesAt: new Date(),
  //         }),
  //         this.perfilRepository.updateByUser(ownerId, {
  //           delivery_time: data.mediaDate,
  //         }),

  //         this.notificationsRepository.create(sellerNotification),
  //         this.notificationsRepository.create(buyerNotification),
  //         this.skinRepository.updateById(data.updateConfirm.skin_id, {
  //           status: "Concluído",
  //           saledAt: new Date(),
  //         }),
  //       ];
  //     }
  //   }
  // }
  // function formatBalance(balance: number) {
  //   return balance.toLocaleString("pt-BR", {
  //     style: "currency",
  //     currency: "BRL",
  //     minimumFractionDigits: 2,
  //   });
}
