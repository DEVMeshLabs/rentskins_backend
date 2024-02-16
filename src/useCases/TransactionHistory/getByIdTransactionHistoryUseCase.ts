import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
import { TransactionHistoryNotExistError } from "../@errors/TransactionHistory/TransactionHistoryNotExistError";

export class GetByIdTransactionHistoryUseCase {
  constructor(private transactionRepository: ITransactionHistoryRepository) {}

  async execute(id: string) {
    const findTransactionHistory = await this.transactionRepository.findById(
      id
    );

    if (!findTransactionHistory) {
      throw new TransactionHistoryNotExistError();
    }

    return findTransactionHistory;
  }
}
