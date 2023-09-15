import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";

export class UpdateConfirmTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}
  async execute(id: string, query: string) {
    const findTransaction = await this.transactionRepository.findById(id);

    if (!findTransaction) {
      throw new TransactionNotExistError();
    }

    const updateConfirm = await this.transactionRepository.updateConfirm(
      id,
      query
    );
    return updateConfirm;
  }
}
