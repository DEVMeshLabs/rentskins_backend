import { Wallet } from "@prisma/client";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { WalletNotExistsError } from "../@errors/Wallet/WalletNotExistsError";

export class UpdateWalletValueUseCase {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(id: string, type: string, value: number): Promise<Wallet> {
    const updateValue = await this.walletRepository.updateByUserValue(
      id,
      type,
      value
    );

    if (updateValue.count === 0) {
      throw new WalletNotExistsError();
    }

    return updateValue;
  }
}
