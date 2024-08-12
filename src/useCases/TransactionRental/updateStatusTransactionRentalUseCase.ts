import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";
import type { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";

export class UpdateStatusTransactionRentalUseCase {
  constructor(private transactionRepository: IRentalTransactionRepository) {}
  async execute(
    id: string,
    status:
      | "WaitingForGuaranteeConfirmation"
      | "WaitingForSellerOffer"
      | "WaitingForSellerConfirmation"
      | "TrialPeriodStarted"
      | "WaitingForReturn"
      | "WaitingForUserDecision"
      | "Completed"
      | "Failed"
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