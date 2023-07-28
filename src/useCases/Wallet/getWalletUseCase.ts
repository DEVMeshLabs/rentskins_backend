import { Wallet } from "@prisma/client";
import { IWalletRepository } from "@/repositories/interface/IWalletRepository";
import { WalletNotExistsError } from "../@errors/Wallet/WalletNotExistsError";

export class GetWalletUseCase {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(id: string): Promise<Wallet> {
    const wallet = await this.walletRepository.findById(id);

    if (!wallet) {
      throw new WalletNotExistsError();
    }

    return wallet;
  }
}
