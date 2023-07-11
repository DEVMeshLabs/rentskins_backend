import { IWalletRepository } from "@/repositories/interface/IWalletRepository";
import { Wallet } from "@prisma/client";

interface createWalletRequest {
  owner_name: string;
  owner_id: string;
}

export class CreateWalletUseCase {
  constructor(private walletRepository: IWalletRepository) {}

  async execute({
    owner_id,
    owner_name,
  }: createWalletRequest): Promise<Wallet> {
    const walletCreate = await this.walletRepository.create({
      owner_id,
      owner_name,
    });
    return walletCreate;
  }
}
