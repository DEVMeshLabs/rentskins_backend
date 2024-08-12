import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";
import type { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";

export class GetTransactionRentUseCase {
  constructor(
    private rentalTransactionRepository: IRentalTransactionRepository
  ) {}

  async execute(id: string) {
    const rentalTransaction = await this.rentalTransactionRepository.findById(
      id
    );

    if (!rentalTransaction) {
      throw new TransactionNotExistError();
    }

    return rentalTransaction;
  }
}
