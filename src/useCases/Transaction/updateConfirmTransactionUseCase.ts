import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";
import { NotUpdateTransaction } from "../@errors/Transaction/NotUpdateTransaction";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import { Transaction } from "@prisma/client";
import { MediaDates } from "@/utils/mediaDates";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { calculateReliability } from "@/utils/calculateReliability";
import { Trades } from "@/utils/trades";

export class UpdateConfirmTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private perfilRepository: IPerfilRepository,
    private walletRepository: IWalletRepository,
    private notificationsRepository: INotificationRepository,
    private skinRepository: ISkinsRepository
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
    if (updateConfirm.buyer_confirm === "Aceito") {
      return "Concluído";
    } else if (updateConfirm.buyer_confirm === "Recusado") {
      return "Falhou";
    }
    return "Em andamento";
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
  ): Promise<void> {
    const findTransaction = await this.findTransactionById(id);

    const findAllDateTransactions =
      await this.transactionRepository.findByManyUser(
        findTransaction.seller_id
      );

    const skin = await this.skinRepository.findById(findTransaction.skin_id);

    const filteredTransactions = findAllDateTransactions.filter((item) => {
      return item.salesAt !== null;
    });

    const calc = new MediaDates();
    const mediaDate = await calc.calcularDiferenciaDates(filteredTransactions);

    if (findTransaction.seller_confirm === "Aceito") {
      await Trades.filterTradeHistory("76561198862407248", "34489117389");

      const findPerfil = await this.findPerfilByUser(findTransaction.buyer_id);
      await this.notificationsRepository.create({
        owner_id: updateConfirm.buyer_id,
        description: `O usuário ${findPerfil.owner_name} confirmou o envio do item ${skin.skin_name}.`,
        skin_id: findTransaction.skin_id,
      });
    } else if (findTransaction.seller_confirm === "Recusado") {
      const findPerfil = await this.findPerfilByUser(findTransaction.buyer_id);
      await this.notificationsRepository.create({
        owner_id: updateConfirm.buyer_id,
        description: `O usuário ${findPerfil.owner_name} recusou o envio do item ${skin.skin_name}.`,
        skin_id: findTransaction.skin_id,
      });
    }

    if (findTransaction.status === "Concluído") {
      const findPerfil = await this.findPerfilByUser(findTransaction.seller_id);
      const percentDiscount = 4;
      const discountAmount = (percentDiscount / 100) * updateConfirm.balance;
      const newBalance = updateConfirm.balance - discountAmount;

      const formattedBalance = findTransaction.balance.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });

      const sellerUpdate = [
        this.walletRepository.updateByUserValue(
          updateConfirm.seller_id,
          "increment",
          newBalance
        ),
        this.perfilRepository.updateByUser(updateConfirm.seller_id, {
          total_exchanges_completed: findPerfil.total_exchanges_completed + 1,
        }),

        this.transactionRepository.updateId(id, { salesAt: new Date() }),
        this.perfilRepository.updateByUser(updateConfirm.seller_id, {
          delivery_time: mediaDate,
        }),

        this.notificationsRepository.create({
          owner_id: updateConfirm.seller_id,
          description: `A venda do item ${skin.skin_name} foi realizada com sucesso! Seus créditos foram carregados em ${formattedBalance}.`,
          skin_id: findTransaction.skin_id,
        }),
        this.skinRepository.updateById(updateConfirm.skin_id, {
          status: "Concluído",
          saledAt: new Date(),
        }),
      ];

      const buyerUpdates = [
        this.notificationsRepository.create({
          owner_id: updateConfirm.buyer_id,
          description: `A compra do item ${skin.skin_name} foi realizada com sucesso! Verifique o item em seu inventário.`,
          skin_id: findTransaction.skin_id,
        }),
      ];

      await Promise.all([...sellerUpdate, ...buyerUpdates]);

      const user = await this.perfilRepository.findByUser(
        findTransaction.seller_id
      );

      if (user.total_exchanges_completed > 2) {
        const reliability = await calculateReliability(user);
        await this.perfilRepository.updateByUser(findTransaction.seller_id, {
          reliability,
        });
      }
    }

    if (
      findTransaction.status === "Falhou" &&
      (findTransaction.buyer_confirm === "Recusado" ||
        findTransaction.seller_confirm === "Recusado")
    ) {
      const formattedBalance = findTransaction.balance.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });

      await Promise.all([
        this.notificationsRepository.create({
          owner_id: updateConfirm.buyer_id,
          description: `A compra do item ${skin.skin_name} foi cancelada. ${formattedBalance} foram restaurados em seus créditos.`,
          skin_id: findTransaction.skin_id,
        }),
        this.notificationsRepository.create({
          owner_id: updateConfirm.seller_id,
          description: `A venda do item ${skin.skin_name} foi cancelada. Conclua as trocas com honestidade ou sua conta receberá uma punição.`,
          skin_id: findTransaction.skin_id,
        }),
        this.walletRepository.updateByUserValue(
          findTransaction.buyer_id,
          "increment",
          findTransaction.balance
        ),
        this.skinRepository.updateById(findTransaction.skin_id, {
          status: "Falhou",
        }),
      ]);
    }
  }

  // ----------------------------------------------------------------
  async findPerfilByUser(owner_id: string) {
    const findPerfil = await this.perfilRepository.findByUser(owner_id);

    if (!findPerfil) {
      throw new PerfilNotExistError();
    }

    return findPerfil;
  }
}
