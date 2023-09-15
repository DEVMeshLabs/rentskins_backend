import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";

export class GetManyTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}
  async execute() {
    const retrive = await this.transactionRepository.findByMany();
    return retrive;
  }
}
