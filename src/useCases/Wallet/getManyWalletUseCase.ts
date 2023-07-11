import { Wallet } from "@prisma/client";
import { IWalletRepository } from "@/repositories/interface/IWalletRepository";

export class GetManyWalletUseCase {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(): Promise<Wallet[]> {
    const walletAll = await this.walletRepository.findByMany();
    return walletAll;
  }
}
