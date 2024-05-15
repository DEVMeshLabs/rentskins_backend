import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";
import { NotUpdateTransaction } from "../@errors/Transaction/NotUpdateTransaction";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import { Skin, Transaction } from "@prisma/client";
import { MediaDates } from "@/utils/mediaDates";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { calculateReliability } from "@/utils/calculateReliability";
import { Trades } from "@/utils/trades";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { calculateDiscount } from "@/utils/calculateDiscount";
import { formatBalance } from "@/utils/formatBalance";

interface IComposeOwnerIdUpdates {
  id: string;
  findTransaction: Transaction;
  updateConfirm: Transaction;
  skin: Skin;
  mediaDate?: any;
}

export class UpdateConfirmTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private perfilRepository: IPerfilRepository,
    private walletRepository: IWalletRepository,
    private notificationsRepository: INotificationRepository,
    private skinRepository: ISkinsRepository,
    private configurationRepository: IConfigurationRepository
  ) {}

  async execute(
    id: string,
    status: "Recusado" | "Aceito",
    query: "buyer" | null
  ) {
    const findTransaction = await this.findTransactionById(id);
    this.validateTransaction(findTransaction);

    const updateConfirm = await this.transactionRepository.updateConfirm(
      id,
      status,
      query
    );

    const validStatus = await this.determineStatus(updateConfirm);

    await this.transactionRepository.updateId(id, { status: validStatus });

    if (this.isPending(updateConfirm)) {
      await this.handleCompletedTransaction(id, updateConfirm);
    }

    return updateConfirm;
  }

  // ----------------------------------------------------------------

  private async findTransactionById(id: string) {
    const findTransaction = await this.transactionRepository.findById(id);
    if (!findTransaction) {
      throw new TransactionNotExistError();
    }
    return findTransaction;
  }

  private validateTransaction(transaction: Transaction) {
    if (transaction.status === "Concluído") {
      throw new NotUpdateTransaction();
    }
  }

  // ----------------------------------------------------------------

  private async determineStatus(updateConfirm: any): Promise<string> {
    return updateConfirm.buyer_confirm === "Aceito"
      ? "Concluído"
      : updateConfirm.buyer_confirm === "Recusado"
      ? "Falhou"
      : "Em andamento";
  }

  private isPending(updateConfirm: any) {
    return (
      updateConfirm.buyer_confirm !== "Pendente" ||
      updateConfirm.seller_confirm !== "Pendente"
    );
  }

  // ----------------------------------------------------------------

  async handleCompletedTransaction(
    id: string,
    updateConfirm: any
  ): Promise<any> {
    const findTransaction = await this.findTransactionById(id);
    const skin = await this.skinRepository.findById(findTransaction.skin_id);

    const findAllDateTransactions =
      await this.transactionRepository.findByManyUser(
        findTransaction.seller_id
      );

    const filteredTransactions = findAllDateTransactions.filter((item) => {
      return item.salesAt !== null;
    });

    const calc = new MediaDates();
    const mediaDate = await calc.calcularDiferenciaDates(
      filteredTransactions,
      findTransaction.seller_id
    );

    if (findTransaction.seller_confirm === "Aceito") {
      const findPerfil = await this.findPerfilByUser(findTransaction.seller_id);

      const [configurationBuyer, configurationSeller, , findSkin] =
        await Promise.all([
          this.configurationRepository.findByUser(findTransaction.buyer_id),
          this.configurationRepository.findByUser(findTransaction.seller_id),
          this.findPerfilByUser(findTransaction.buyer_id),
          this.skinRepository.findById(findTransaction.skin_id),
          this.notificationsRepository.create({
            owner_id: updateConfirm.buyer_id,
            description: `O vendedor ${findPerfil.owner_name} confirmou o envio do item ${skin.skin_name}.`,
            skin_id: findTransaction.skin_id,
          }),
        ]);

      // Verificar se o vendedor ou comprador tem uma key

      const hasSellerKey = !!configurationSeller.key;
      const hasBuyerKey = !!configurationBuyer.key;

      const tradeUserId = hasSellerKey
        ? findTransaction.buyer_id
        : findTransaction.seller_id;

      const tradeKey = hasSellerKey
        ? configurationSeller.key
        : configurationBuyer.key;

      // const steamIdOther = "76561198862407248";
      // const assetId = "34489117389";
      // const key = "C3B106395E5E2FCD39B30DF5E85C28E0";
      // assets_received
      // assets_given

      if (hasSellerKey || hasBuyerKey) {
        const trade = await Trades.filterTradeHistory(
          tradeUserId,
          tradeKey,
          findSkin.asset_id
        );

        if (trade.length > 0) {
          const sellerUpdates = await this.composeOwnerIdUpdates(
            updateConfirm.seller_id,
            false,
            {
              id,
              findTransaction,
              updateConfirm,
              skin,
              mediaDate,
            }
          );
          return Promise.all([...sellerUpdates]);
        }
      }
    } else if (findTransaction.seller_confirm === "Recusado") {
      const findPerfil = await this.findPerfilByUser(findTransaction.seller_id);

      const transactionFailed = [
        this.walletRepository.updateByUserValue(
          findTransaction.buyer_id,
          "increment",
          findTransaction.balance
        ),
        this.notificationsRepository.create({
          owner_id: findTransaction.buyer_id,
          description: `O vendedor recusou o envio do item ${skin.skin_name}.`,
          skin_id: findTransaction.skin_id,
        }),
        this.transactionRepository.updateId(findTransaction.id, {
          status: "Falhou",
        }),
        this.skinRepository.updateById(updateConfirm.skin_id, {
          status: "Falhou",
        }),
        this.perfilRepository.updateByUser(findTransaction.seller_id, {
          total_exchanges_failed: findPerfil.total_exchanges_failed + 1,
        }),
      ];

      return Promise.all([...transactionFailed]);
    }

    // STATUS TRANSACTION CONCLUÍDO

    if (findTransaction.status === "Concluído") {
      // Atualizar o vendedor e envia as notificações
      const sellerUpdates = await this.composeOwnerIdUpdates(
        updateConfirm.seller_id,
        false,
        {
          id,
          findTransaction,
          updateConfirm,
          skin,
          mediaDate,
        }
      );

      await Promise.all([...sellerUpdates]);

      const user = await this.perfilRepository.findByUser(
        findTransaction.seller_id
      );
      // &&
      // user.total_exchanges_failed > 2
      if (user.total_exchanges_completed > 2) {
        const reliability = await calculateReliability(user);
        await this.perfilRepository.updateByUser(findTransaction.seller_id, {
          reliability,
        });
      }
    }

    // STATUS TRANSACTION FALHOU

    if (findTransaction.status === "Falhou") {
      await Promise.all([
        this.composeOwnerIdUpdates(findTransaction.buyer_id, true, {
          id,
          findTransaction,
          updateConfirm,
          skin,
          mediaDate,
        }),
      ]);

      const perfil = await this.perfilRepository.findByUser(
        findTransaction.seller_id
      );

      if (perfil) {
        await this.perfilRepository.updateByUser(findTransaction.seller_id, {
          total_exchanges_failed: perfil.total_exchanges_failed + 1,
        });

        if (perfil.total_exchanges_completed > 2) {
          const reliability = await calculateReliability(perfil);
          await this.perfilRepository.updateByUser(findTransaction.seller_id, {
            reliability,
          });
        }
      }
    }
  }

  async findPerfilByUser(owner_id: string) {
    const findPerfil = await this.perfilRepository.findByUser(owner_id);

    if (!findPerfil) {
      throw new PerfilNotExistError();
    }

    return findPerfil;
  }

  async composeOwnerIdUpdates(
    ownerId: string,
    isTransactionFailed: boolean,
    data: IComposeOwnerIdUpdates
  ): Promise<any> {
    const { balance } = data.findTransaction;
    const { formattedBalance, porcentagem } = formatBalance(balance);

    const { newBalance } = calculateDiscount(data.updateConfirm.balance);

    const sellerNotification = this.createSellerNotification(
      data,
      isTransactionFailed,
      porcentagem.toString()
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
        : `A venda do item ${data.skin.skin_name} foi realizada com sucesso! Seus créditos foram carregados em R$:${formattedBalance}.`,
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
}
