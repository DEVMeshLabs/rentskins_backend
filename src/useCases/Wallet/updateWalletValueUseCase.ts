import { Wallet } from "@prisma/client";
import { IWalletRepository } from "@/repositories/interface/IWalletRepository";
import { WalletNotExistsError } from "../@errors/Wallet/WalletNotExistsError";

export class UpdateWalletValueUseCase {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(id: string, value: string): Promise<Wallet> {
    const updateValue = await this.walletRepository.updateByUserValue(
      id,
      value
    );

    if (updateValue.count === 0) {
      throw new WalletNotExistsError();
    }

    return updateValue;
  }
}
