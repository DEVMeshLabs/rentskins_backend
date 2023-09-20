import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";

export class GetManyLastSalesUser {
  constructor(private transactionRepository: ITransactionRepository) {}
  async execute(seller_id: string) {
    const foundTransactionUser = await this.transactionRepository.findByUser(
      seller_id
    );

    if (!foundTransactionUser) {
      throw new TransactionNotExistError();
    }

    const lastSalesUser = await this.transactionRepository.lastSalesUser(
      seller_id
    );

    const test = lastSalesUser.map((item) => {
      const saleAt = item.salesAt;
      const value = item.balance;
      return {
        saleAt,
        value,
      };
    });

    return test;
  }
}
