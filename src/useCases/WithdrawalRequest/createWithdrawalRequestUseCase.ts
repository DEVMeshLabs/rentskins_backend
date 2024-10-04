import { Prisma, type WithdrawalRequest } from "@prisma/client";
import type { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { InsufficientFundsError } from "../@errors/Wallet/InsufficientFundsError";
import { WalletNotExistsError } from "../@errors/Wallet/WalletNotExistsError";
import type { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import type { IWithdrawalRequestRepository } from "@/repositories/interfaceRepository/IWithdrawalRequestRepository";
import { UpdateFailedError } from "../@errors/Wallet/UpdateFailedError";

export class CreateWithdrawalRequestUseCase {
  private static readonly FEE_PERCENTAGE = 0.01; // 1%

  constructor(
    private readonly withdrawalRequestRepository: IWithdrawalRequestRepository,
    private readonly walletRepository: IWalletRepository,
    private readonly notificationRepository: INotificationRepository
  ) {}

  // Método utilitário para calcular a taxa de saque
  private calculateFee(amount: number): number {
    return amount * CreateWithdrawalRequestUseCase.FEE_PERCENTAGE;
  }

  async execute(
    data: Prisma.WithdrawalRequestCreateInput
  ): Promise<WithdrawalRequest> {
    // Busca a carteira do usuário
    const wallet = await this.walletRepository.findByUser(data.owner_id);

    if (!wallet) {
      throw new WalletNotExistsError();
    }

    const fee = this.calculateFee(data.amount);

    if (wallet.value <= data.amount) {
      throw new InsufficientFundsError();
    }

    const isWalletUpdated = await this.walletRepository.updateByUserValue(
      data.owner_id,
      "decrement",
      data.amount
    );

    if (!isWalletUpdated) {
      throw new UpdateFailedError();
    }

    // Cria a solicitação de saque
    const withdrawalRequest = await this.withdrawalRequestRepository.create({
      ...data,
      amountTotal: data.amount,
      amount: data.amount - fee,
    });

    // Envia a notificação para o usuário
    await this.notificationRepository.create({
      owner_id: data.owner_id,
      description: `Solicitação de saque de R$ ${data.amount} realizada com sucesso!`,
    });

    return withdrawalRequest;
  }
}