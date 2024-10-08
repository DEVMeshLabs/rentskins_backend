import type { IWithdrawalRequestRepository } from "@/repositories/interfaceRepository/IWithdrawalRequestRepository";
import { WalletNotExistsError } from "../@errors/Wallet/WalletNotExistsError";
import { UpdateFailedError } from "../@errors/Wallet/UpdateFailedError";
import type { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import type { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import type { WithdrawalRequest } from "@prisma/client";
import { HasAlreadyBeenUpdated } from "../@errors/WithdrawalRequest/hasAlreadyBeenUpdated";

export class UpdateStatusUserWithdrawalRequestUseCase {
  constructor(
    private readonly withdrawalRequestRepository: IWithdrawalRequestRepository,
    private readonly walletRepository: IWalletRepository,
    private readonly notificationRepository: INotificationRepository
  ) {}

  async execute(id: string, status: "Approved" | "Rejected"): Promise<void> {
    const withdrawalRequest = await this.withdrawalRequestRepository.findById(
      id
    );
    console.log(withdrawalRequest);
    if (withdrawalRequest.status !== "Pending") {
      throw new HasAlreadyBeenUpdated();
    }

    const isWithdrawalRequestUpdated =
      await this.withdrawalRequestRepository.updateStatusUser(
        withdrawalRequest.id,
        status
      );

    if (!isWithdrawalRequestUpdated) {
      throw new UpdateFailedError();
    }

    if (status === "Rejected") {
      await this.handleRejectedWithdrawal(withdrawalRequest);
    } else {
      await this.sendNotification(
        withdrawalRequest.owner_id,
        "Solicitação de saque aprovada! O valor solicitado foi transferido para sua conta bancária."
      );
    }
  }

  private async handleRejectedWithdrawal(
    withdrawalRequest: WithdrawalRequest
  ): Promise<void> {
    try {
      if (!withdrawalRequest) {
        throw new WalletNotExistsError();
      }

      const isWalletUpdated = await this.walletRepository.updateByUserValue(
        withdrawalRequest.owner_id,
        "increment",
        withdrawalRequest.amountTotal
      );

      if (!isWalletUpdated) {
        throw new UpdateFailedError();
      }

      await this.sendNotification(
        withdrawalRequest.owner_id,
        `Solicitação de saque rejeitada! O valor de R$ ${withdrawalRequest.amountTotal} foi devolvido à sua carteira.`
      );
    } catch (error) {
      console.log(error);
    }
  }

  private async sendNotification(
    owner_id: string,
    description: string
  ): Promise<void> {
    await this.notificationRepository.create({ owner_id, description });
  }
}
