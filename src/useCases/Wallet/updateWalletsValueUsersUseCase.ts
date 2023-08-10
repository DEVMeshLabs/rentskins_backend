import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { InsufficientFundsError } from "../@errors/Wallet/InsufficientFundsError";
import { WalletNotExistsError } from "../@errors/Wallet/WalletNotExistsError";

export class UpdateWalletsValueUsersUseCase {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(id: string, other_id: string, value: number) {
    const response = await this.walletRepository.findByWalletsId(id, other_id);

    if (!response[0] || !response[1]) {
      throw new WalletNotExistsError();
    }

    if (response[0].value < value) {
      throw new InsufficientFundsError();
    }
    const updateWallets = await this.walletRepository.updateWalletsUsers(
      id,
      other_id,
      value
    );
    return updateWallets;
  }
}
