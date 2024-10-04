import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";

export class GetIdTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}
  async execute(id: string) {
    const findTransactionUser = await this.transactionRepository.findById(id);

    if (!findTransactionUser) {
      throw new TransactionNotExistError();
    }

    return findTransactionUser;
  }
}
