import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";
import { NotUpdateTransaction } from "../@errors/Transaction/NotUpdateTransaction";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import { Perfil, Skin, Transaction } from "@prisma/client";
import { MediaDates } from "@/utils/mediaDates";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { calculateReliability } from "@/utils/calculateReliability";
import { Trades } from "@/utils/trades";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { calculateDiscount } from "@/utils/calculateDiscount";

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

  async execute(id: string, status: string, query: string) {
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
      const configurationBuyer = await this.configurationRepository.findByUser(
        findTransaction.buyer_id
      );

      const configurationSeller = await this.configurationRepository.findByUser(
        findTransaction.seller_id
      );
      const findPerfilUser = await this.findPerfilByUser(
        findTransaction.buyer_id
      );

      const findSkin = await this.skinRepository.findById(
        findTransaction.skin_id
      );

      // Verificar se o vendedor ou comprador tem uma key

      const hasSellerKey =
        configurationSeller.key && configurationSeller.key !== "";

      const hasBuyerKey =
        configurationBuyer.key && configurationBuyer.key !== "";

      const sellerUpdates = await this.composeOwnerIdUpdates(
        updateConfirm.seller_id,
        false,
        {
          id,
          findTransaction,
          updateConfirm,
          skin,
          mediaDate,
        },
        findPerfilUser
      );

      if (hasSellerKey) {
        const trade = await Trades.filterTradeHistory(
          findTransaction.buyer_id,
          findSkin.asset_id,
          configurationSeller.key
        );

        if (trade) {
          await Promise.all([...sellerUpdates]);
          return;
        }
      } else if (hasBuyerKey) {
        const trade = await Trades.filterTradeHistory(
          findTransaction.seller_id,
          findSkin.asset_id,
          configurationSeller.key
        );

        if (trade) {
          await Promise.all([...sellerUpdates]);
          return;
        }
      }

      // -------------------------------------------------------------
      const findPerfil = await this.findPerfilByUser(findTransaction.buyer_id);
      await this.notificationsRepository.create({
        owner_id: updateConfirm.buyer_id,
        description: `O vendedor ${findPerfil.owner_name} confirmou o envio do item ${skin.skin_name}.`,
        skin_id: findTransaction.skin_id,
      });
    } else if (findTransaction.seller_confirm === "Recusado") {
      const findPerfil = await this.findPerfilByUser(findTransaction.buyer_id);
      await this.notificationsRepository.create({
        owner_id: updateConfirm.buyer_id,
        description: `O vendedor ${findPerfil.owner_name} recusou o envio do item ${skin.skin_name}.`,
        skin_id: findTransaction.skin_id,
      });
    }

    // STATUS TRANSACTION CONCLUÍDO

    if (findTransaction.status === "Concluído") {
      const findPerfil = await this.findPerfilByUser(findTransaction.seller_id);

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
        },
        findPerfil
      );

      await Promise.all([...sellerUpdates]);

      const user = await this.perfilRepository.findByUser(
        findTransaction.seller_id
      );

      if (
        user.total_exchanges_completed > 2 &&
        user.total_exchanges_failed > 2
      ) {
        const reliability = await calculateReliability(user);
        await this.perfilRepository.updateByUser(findTransaction.seller_id, {
          reliability,
        });
      }
    }

    // STATUS TRANSACTION FALHOU

    if (findTransaction.status === "Falhou") {
      const buyerUpdates = await this.composeOwnerIdUpdates(
        findTransaction.buyer_id,
        true,
        {
          id,
          findTransaction,
          updateConfirm,
          skin,
          mediaDate,
        }
      );

      await Promise.all([...buyerUpdates]);

      const perfil = await this.perfilRepository.findByUser(
        findTransaction.seller_id
      );

      if (perfil) {
        await this.perfilRepository.updateByUser(findTransaction.seller_id, {
          total_exchanges_failed: perfil.total_exchanges_failed + 1,
        });
      }

      if (
        perfil &&
        perfil.total_exchanges_completed > 2 &&
        perfil.total_exchanges_completed > 2
      ) {
        const reliability = await calculateReliability(perfil);
        await this.perfilRepository.updateByUser(findTransaction.seller_id, {
          reliability,
        });
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
    data: IComposeOwnerIdUpdates,
    perfil?: Perfil
  ): Promise<any> {
    const { balance } = data.findTransaction;
    const formattedBalance = formatBalance(balance);
    const { newBalance } = calculateDiscount(data.updateConfirm.balance);

    const skinId = data.findTransaction.skin_id;
    const skinName = data.skin.skin_name;

    const sellerNotification = {
      owner_id: data.updateConfirm.seller_id,
      description: isTransactionFailed
        ? `A venda do item ${skinName} foi cancelada. Conclua as trocas com honestidade ou sua conta receberá uma punição.`
        : `A venda do item ${skinName} foi realizada com sucesso! Seus créditos foram carregados em ${formattedBalance}.`,
      skin_id: skinId,
    };

    const buyerNotification = {
      owner_id: data.updateConfirm.buyer_id,
      description: isTransactionFailed
        ? `A compra do item ${skinName} foi cancelada. ${formattedBalance} foram restaurados em seus créditos.`
        : `A compra do item ${skinName} foi realizada com sucesso! Verifique o item em seu inventário.`,
      skin_id: skinId,
    };

    if (isTransactionFailed) {
      return [
        this.walletRepository.updateByUserValue(
          ownerId,
          "increment",
          data.findTransaction.balance
        ),
        this.notificationsRepository.create(sellerNotification),
        this.transactionRepository.updateId(data.findTransaction.id, {
          status: "Falhou",
        }),
        this.notificationsRepository.create(buyerNotification),
        this.skinRepository.updateById(data.updateConfirm.skin_id, {
          status: "Falhou",
        }),
      ];
    } else {
      return [
        this.walletRepository.updateByUserValue(
          ownerId,
          "increment",
          newBalance
        ),
        perfil &&
          this.perfilRepository.updateByUser(ownerId, {
            total_exchanges_completed: perfil.total_exchanges_completed + 1,
          }),

        this.transactionRepository.updateId(data.id, { salesAt: new Date() }),
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
    }
  }
}

function formatBalance(balance: number) {
  return balance.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}
