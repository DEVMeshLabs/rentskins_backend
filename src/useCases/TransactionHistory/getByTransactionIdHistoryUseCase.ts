import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
import { TransactionHistoryNotExistError } from "../@errors/TransactionHistory/TransactionHistoryNotExistError";

export class GetByTransactionIdHistoryUseCase {
  constructor(private transactionRepository: ITransactionHistoryRepository) {}

  async execute(id: string) {
    const findTransactionHistory =
      await this.transactionRepository.findByTrasactionId(id);

    if (!findTransactionHistory) {
      throw new TransactionHistoryNotExistError();
    }

    return findTransactionHistory;
  }
}
