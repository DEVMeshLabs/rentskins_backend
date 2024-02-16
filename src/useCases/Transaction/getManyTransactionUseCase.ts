import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";

export class GetManyTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}
  async execute() {
    const allTransaction = await this.transactionRepository.findByMany();
    return allTransaction;
  }
}
