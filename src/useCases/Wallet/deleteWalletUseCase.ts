import { IWalletRepository } from "@/repositories/interface/IWalletRepository";
import { Wallet } from "@prisma/client";
import { WalletNotExistsError } from "../errors/Wallet/WalletNotExistsError";

export class DeleteWalletUseCase {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(id: string): Promise<Wallet> {
    const getWallet = await this.walletRepository.findById(id);

    if (!getWallet) {
      throw new WalletNotExistsError();
    }

    const deleteWallet = await this.walletRepository.deleteWallet(id);
    return deleteWallet;
  }
}
