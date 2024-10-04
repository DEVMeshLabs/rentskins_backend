import { WithdrawalRequest } from "@prisma/client";
import type { IWithdrawalRequestRepository } from "@/repositories/interfaceRepository/IWithdrawalRequestRepository";

export class GetManyWithdrawnlRequestUseCase {
  constructor(
    private withdrawnRequestRepository: IWithdrawalRequestRepository
  ) {}

  async execute(): Promise<WithdrawalRequest[]> {
    const walletAll = await this.withdrawnRequestRepository.findByMany();
    return walletAll;
  }
}
