import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";

export class UpdateConfirmTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private walletRepository: IWalletRepository
  ) {}

  async execute(id: string, status: string, query: string) {
    const findTransaction = await this.transactionRepository.findById(id);

    if (!findTransaction) {
      throw new TransactionNotExistError();
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
      await this.walletRepository.updateByUserValue(
        updateConfirm.seller_id,
        "increment",
        updateConfirm.balance
      );
    }

    return updateConfirm;
  }
}
