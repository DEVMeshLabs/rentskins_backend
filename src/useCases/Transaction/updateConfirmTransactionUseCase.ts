import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { NotUpdateTransaction } from "../@errors/Transaction/NotUpdateTransaction";

export class UpdateConfirmTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private perfilRepository: IPerfilRepository,
    private walletRepository: IWalletRepository
  ) {}

  async execute(id: string, status: string, query: string) {
    const findTransaction = await this.transactionRepository.findById(id);

    if (!findTransaction) {
      throw new TransactionNotExistError();
    }

    if (
      findTransaction.seller_confirm === "Aceito" &&
      findTransaction.buyer_confirm === "Aceito"
    ) {
      throw new NotUpdateTransaction();
    }

    const updateConfirm = await this.transactionRepository.updateConfirm(
      id,
      status,
      query
    );

    if (
      updateConfirm.buyer_confirm === "Aceito" &&
      updateConfirm.seller_confirm === "Aceito"
    ) {
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
    return updateConfirm;
  }
}
