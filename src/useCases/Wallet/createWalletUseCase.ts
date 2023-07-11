import { IWalletRepository } from "@/repositories/interface/IWalletRepository";
import { Wallet } from "@prisma/client";

export class CreateWalletUseCase {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(data: any): Promise<Wallet> {
    const walletCreate = await this.walletRepository.create(data);
    return walletCreate;
  }
}
