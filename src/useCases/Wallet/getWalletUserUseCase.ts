import { Wallet } from "@prisma/client";
import { IWalletRepository } from "@/repositories/interface/IWalletRepository";
import { WalletNotExistsError } from "../errors/Wallet/WalletNotExistsError";

export class GetWalletUserUseCase {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(owner_id: string): Promise<Wallet> {
    const walletUser = await this.walletRepository.findByUser(owner_id);
    console.log(walletUser);
    if (!walletUser) {
      throw new WalletNotExistsError();
    }

    return walletUser;
  }
}
