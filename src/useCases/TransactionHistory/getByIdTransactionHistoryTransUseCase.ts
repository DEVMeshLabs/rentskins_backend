import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
import { TransactionHistoryNotExistError } from "../@errors/TransactionHistory/TransactionHistoryNotExistError";

export class GetByIdTransactionHistoryTransUseCase {
  constructor(
    private transactionHistoryRepository: ITransactionHistoryRepository
  ) {}

  async execute(id: string) {
    const findTransactionHistory =
      await this.transactionHistoryRepository.findByTrasactionId(id);

    if (!findTransactionHistory) {
      throw new TransactionHistoryNotExistError();
    }

    return findTransactionHistory;
  }
}
