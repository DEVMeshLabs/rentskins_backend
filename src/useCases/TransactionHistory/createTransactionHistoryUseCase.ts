// ------------------ Repositorys -----------------
import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
// ------------------ Errors -----------------
import { TransactionHistoryNotExistError } from "../@errors/TransactionHistory/TransactionHistoryNotExistError";
import { addHours } from "@/utils/compareDates";
import { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";
// ------------------ Outros -----------------

interface ITransactionRequest {
  transaction_id?: string;
  rentalTransaction_id?: string;
  seller_id: string;
  buyer_id: string;
}

export class CreateTransactionHistoryUseCase {
  constructor(
    private transactionHistoryRepository: ITransactionHistoryRepository,
    private transactionRepository: ITransactionRepository,
    private rentalTransactionRepository: IRentalTransactionRepository
  ) {}

  async execute({
    transaction_id,
    rentalTransaction_id,
    buyer_id,
    seller_id,
  }: ITransactionRequest) {
    const findTransaction = await this.transactionRepository.findById(
      transaction_id
    );
    const findRentalTransaction =
      await this.rentalTransactionRepository.findById(rentalTransaction_id);

    if (!findTransaction || !findRentalTransaction) {
      throw new TransactionHistoryNotExistError();
    }
    const process = findRentalTransaction
      ? addHours(24 * Number(findRentalTransaction.days_quantity + 1))
      : addHours(1);

    const create = await this.transactionHistoryRepository.create({
      transaction_id: findTransaction.id && null,
      rentalTransaction_id: findRentalTransaction.id && null,
      buyer_id,
      seller_id,
      asset_id: findTransaction.skin_id,
      dateProcess: process,
    });
    console.log(create);
    return create;
  }
}
