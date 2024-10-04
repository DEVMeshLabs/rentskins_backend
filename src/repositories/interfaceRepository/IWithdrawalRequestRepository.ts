import { Prisma, type WithdrawalRequest } from "@prisma/client";

export interface IWithdrawalRequestRepository {
  findByMany(): Promise<WithdrawalRequest[]>;
  create(data: Prisma.WithdrawalRequestCreateInput): Promise<any>;
}
