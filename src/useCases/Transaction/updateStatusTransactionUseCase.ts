import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";

export class UpdateStatusTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}
  async execute(
    id: string,
    status:
      | "Default"
      | "NegotiationSend"
      | "NegociationAccepted"
      | "NegociationRejected"
  ) {
    const findTransactionUser = await this.transactionRepository.updateStatus(
      id,
      status
    );

    if (!findTransactionUser) {
      throw new TransactionNotExistError();
    }

    return findTransactionUser;
  }
}
