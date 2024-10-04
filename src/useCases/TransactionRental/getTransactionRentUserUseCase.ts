import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";
import type { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";

export class GetTransactionRentUserUseCase {
  constructor(
    private rentalTransactionRepository: IRentalTransactionRepository
  ) {}

  async execute(id: string) {
    const rentalTransaction =
      await this.rentalTransactionRepository.findByManyUserRent(id);

    if (!rentalTransaction) {
      throw new TransactionNotExistError();
    }

    return rentalTransaction;
  }
}
