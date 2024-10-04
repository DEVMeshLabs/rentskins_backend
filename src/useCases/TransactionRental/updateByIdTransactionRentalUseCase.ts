import { Prisma } from "@prisma/client";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";
import { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";

export class UpdateByIdTransactionRentalUseCase {
  constructor(
    private transactionRentalRepository: IRentalTransactionRepository
  ) {}

  async execute(id: string, date: Prisma.RentalTransactionUpdateInput) {
    const findTransactionUser = await this.transactionRentalRepository.updateId(
      id,
      date
    );

    if (!findTransactionUser) {
      throw new TransactionNotExistError();
    }

    return findTransactionUser;
  }
}
