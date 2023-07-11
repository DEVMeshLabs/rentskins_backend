import { Wallet } from "@prisma/client";
import { IWalletRepository } from "@/repositories/interface/IWalletRepository";
import { WalletNotExistsError } from "../errors/Wallet/WalletNotExistsError";

export class UpdateWalletValueUseCase {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(id: string, value: string): Promise<Wallet> {
    const getWallet = await this.walletRepository.findById(id);

    if (!getWallet) {
      throw new WalletNotExistsError();
    }

    const updateValue = await this.walletRepository.updateByIdValor(id, value);
    return updateValue;
  }
}
