import { Prisma, RentalTransaction } from "@prisma/client";

export interface IRentalTransactionRepository {
  create(data: Prisma.RentalTransactionCreateInput): Promise<RentalTransaction>;
  findById(id: string): Promise<RentalTransaction | null>;

  findByMany(): Promise<RentalTransaction[]>;
  findByManyStatus(status: string): Promise<RentalTransaction[]>;
  checkPendingGuarantee(): Promise<RentalTransaction[]>;
  findByManyUser(steamId: string): Promise<RentalTransaction[]>;
  sendDeadlineNotification(): Promise<RentalTransaction[]>;
  updateId(
    id: string,
    data: Prisma.RentalTransactionUncheckedUpdateInput
  ): Promise<RentalTransaction>;
  updateStatus(
    id: string,
    status:
      | "WaitingForGuaranteeConfirmation"
      | "WaitingForAdministrators"
      | "WaitingForSellerConfirmation"
      | "WaitingForBuyerConfirmation"
      | "TrialPeriodStarted"
      | "WaitingForReturn"
      | "WaitingForUserDecision"
      | "Completed"
      | "Failed"
  ): Promise<RentalTransaction>;

  updateMany(
    ids: string[],
    data: Prisma.RentalTransactionUncheckedUpdateManyInput
  ): Promise<any>;
}
