import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { NotUpdateTransaction } from "../@errors/Transaction/NotUpdateTransaction";
import { Transaction } from "@prisma/client";

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

  private async handleCompletedTransaction(id: string, updateConfirm: any) {
    const findTransaction = await this.findTransactionById(id);

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
          total_exchanges: findPerfil.total_exchanges + 1,
        }),
        this.transactionRepository.updateId(id, { salesAt: new Date() }),
      ]);
    }
  }
}
