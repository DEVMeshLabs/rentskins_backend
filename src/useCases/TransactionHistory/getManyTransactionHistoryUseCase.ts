import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";

export class GetManyTransactionHistoryUseCase {
  constructor(
    private transactionHistoryRepository: ITransactionHistoryRepository
  ) {}

  async execute() {
    const allTransactionHistory =
      await this.transactionHistoryRepository.findByMany();
    return allTransactionHistory;
  }
}
