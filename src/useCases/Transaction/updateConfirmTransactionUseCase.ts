import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { NotUpdateTransaction } from "../@errors/Transaction/NotUpdateTransaction";
import { Transaction } from "@prisma/client";
import { MediaDates } from "@/utils/mediaDates";

export class UpdateConfirmTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private perfilRepository: IPerfilRepository,
    private walletRepository: IWalletRepository
  ) {}

  async execute(id: string, status: string, query: string) {
    const findTransaction = await this.findTransactionById(id);
    this.validateTransaction(findTransaction);

    const updateConfirm = await this.transactionRepository.updateConfirm(
      id,
      status,
      query
    );

    const validStatus = this.determineStatus(updateConfirm);

    if (validStatus !== "Em andamento") {
      const reliability = await this.calculateReliability(
        findTransaction.seller_id
      );
      await this.perfilRepository.updateByUser(findTransaction.seller_id, {
        reliability,
      });
    }

    await this.transactionRepository.updateId(id, { status: validStatus });

    if (!this.isPending(updateConfirm)) {
      await this.handleCompletedTransaction(id, updateConfirm);
    }

    return updateConfirm;
  }

  private async findTransactionById(id: string) {
    const findTransaction = await this.transactionRepository.findById(id);
    if (!findTransaction) {
      throw new TransactionNotExistError();
    }
    return findTransaction;
  }

  private validateTransaction(transaction: Transaction) {
    if (
      transaction.seller_confirm === "Aceito" &&
      transaction.buyer_confirm === "Aceito"
    ) {
      throw new NotUpdateTransaction();
    }
  }

  private determineStatus(updateConfirm: any) {
    if (
      updateConfirm.buyer_confirm === "Aceito" &&
      updateConfirm.seller_confirm === "Aceito"
    ) {
      return "Concluído";
    } else if (
      ["Recusado"].includes(updateConfirm.buyer_confirm) ||
      ["Recusado"].includes(updateConfirm.seller_confirm)
    ) {
      return "Falhou";
    }
    return "Em andamento";
  }

  private isPending(updateConfirm: any) {
    return (
      updateConfirm.buyer_confirm === "Pendente" ||
      updateConfirm.seller_confirm === "Pendente"
    );
  }

  async handleCompletedTransaction(
    id: string,
    updateConfirm: any
  ): Promise<void> {
    const findTransaction = await this.findTransactionById(id);
    const findAllDateTransactions =
      await this.transactionRepository.findByManyUser(
        findTransaction.seller_id
      );

    const teste = findAllDateTransactions.filter((item) => {
      return item.salesAt !== null;
    });

    const calc = new MediaDates();
    const mediaDate = await calc.calcularDiferenciaDates(teste);

    if (findTransaction.status === "Concluído") {
      const findPerfil = await this.perfilRepository.findByUser(
        findTransaction.seller_id
      );

      await Promise.all([
        this.walletRepository.updateByUserValue(
          updateConfirm.seller_id,
          "increment",
          updateConfirm.balance
        ),

        this.perfilRepository.updateByUser(updateConfirm.seller_id, {
          total_exchanges_completed: findPerfil.total_exchanges_completed + 1,
        }),

        this.transactionRepository.updateId(id, { salesAt: new Date() }),
        this.perfilRepository.updateByUser(updateConfirm.seller_id, {
          delivery_time: mediaDate,
        }),
      ]);
    }
  }

  private async calculateReliability(seller_id: string) {
    const user = await this.perfilRepository.findByUser(seller_id);

    const [hora, minutos, segundos] = user.delivery_time.split(":");

    const totalSegundos =
      Number(hora) * 3600 + Number(minutos) * 60 + Number(segundos);

    let hoursDifference = Math.ceil((86400 - totalSegundos) / 3600);

    if (hoursDifference < 0) {
      hoursDifference = 0;
    }

    const timePercentage = ((hoursDifference / 24) * 100).toFixed(2);

    const deliveryPercentage = (
      (user.total_exchanges_completed / user.total_exchanges) *
      100
    ).toFixed(2);
    const reliabilityPercentage = (
      Number(deliveryPercentage) * (3 / 4) +
      Number(timePercentage) * (1 / 4)
    ).toFixed(2);

    return reliabilityPercentage;
  }
}
