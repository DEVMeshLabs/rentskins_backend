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
    const findTransactionUser = await this.transactionRepository.findById(id);

    if (!findTransactionUser) {
      throw new TransactionNotExistError();
    } else if (findTransactionUser.status === "NegociationAccepted") {
      throw new Error("Transaction already accepted");
    }

    const updateTransaction = await this.transactionRepository.updateStatus(
      id,
      status
    );

    return updateTransaction;
  }
}
