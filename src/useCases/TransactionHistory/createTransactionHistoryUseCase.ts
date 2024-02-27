// ------------------ Repositorys -----------------
import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
// ------------------ Errors -----------------
import { TransactionHistoryNotExistError } from "../@errors/TransactionHistory/TransactionHistoryNotExistError";
import { addHours } from "@/utils/compareDates";
// ------------------ Outros -----------------

interface ITransactionRequest {
  transaction_id: string;
  seller_id: string;
  buyer_id: string;
}

export class CreateTransactionHistoryUseCase {
  constructor(
    private transactionHistoryRepository: ITransactionHistoryRepository,
    private transactionRepository: ITransactionRepository
  ) {}

  async execute({ transaction_id, buyer_id, seller_id }: ITransactionRequest) {
    const findTransaction = await this.transactionRepository.findById(
      transaction_id
    );

    if (!findTransaction) {
      throw new TransactionHistoryNotExistError();
    }

    const create = await this.transactionHistoryRepository.create({
      transaction_id: findTransaction.id,
      buyer_id,
      seller_id,
      asset_id: findTransaction.skin_id,
      dateProcess: addHours(),
    });

    return create;
  }
}
