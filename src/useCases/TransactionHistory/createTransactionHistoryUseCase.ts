import type { Skin } from "@prisma/client";
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
  rental: boolean;
  asset_id: string;
  seller_id: string;
  buyer_id: string;
  skins: Skin[];
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
    rental,
    skins,
  }: ITransactionRequest) {
    const findTransaction = await this.transactionRepository.findById(
      transaction_id
    );
    const findRentalTransaction =
      await this.rentalTransactionRepository.findById(rentalTransaction_id);

    if (rental && !findRentalTransaction) {
      throw new TransactionHistoryNotExistError();
    }
    if (!findTransaction) {
      throw new TransactionHistoryNotExistError();
    }
    const process = findRentalTransaction
      ? addHours(24 * Number(findRentalTransaction.daysQuantity + 1))
      : addHours(1);

    const create = await this.transactionHistoryRepository.create({
      transaction_id: findTransaction.id && null,
      rentalTransaction_id: findRentalTransaction.id && null,
      buyer_id,
      seller_id,
      skins: {
        connect: (skins as Skin[]).map((skin) => ({
          id: skin.id,
        })),
      },
      dateProcess: process,
    });

    return create;
  }
}
