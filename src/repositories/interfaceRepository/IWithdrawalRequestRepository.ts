import { Prisma, type WithdrawalRequest } from "@prisma/client";

export interface IWithdrawalRequestRepository {
  findByMany(): Promise<WithdrawalRequest[]>;
  findByUser(owner_id: string): Promise<WithdrawalRequest>;
  create(data: Prisma.WithdrawalRequestCreateInput): Promise<any>;
  updateStatusUser(owner_id: string, status: string): Promise<any>;
}
