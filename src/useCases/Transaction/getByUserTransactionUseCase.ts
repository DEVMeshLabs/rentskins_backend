import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";

export class GetByUserTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}
  async execute(id: string, query: string) {
    const findTransactionUser = await this.transactionRepository.findByUser(
      id,
      query
    );

    if (!findTransactionUser) {
      throw new TransactionNotExistError();
    }

    return findTransactionUser;
  }
}
