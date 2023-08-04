import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { Wallet } from "@prisma/client";
import { WalletAlreadyExistError } from "../@errors/Wallet/WalletAlreadyExistsError";
import { ICartRepository } from "@/repositories/interfaceRepository/ICartRepository";

interface createWalletRequest {
  owner_name: string;
  owner_id: string;
}

export class CreateWalletUseCase {
  constructor(
    private walletRepository: IWalletRepository,
    private cartRepository: ICartRepository
  ) {}

  async execute({
    owner_id,
    owner_name,
  }: createWalletRequest): Promise<Wallet> {
    const isAlreadyExists = await this.walletRepository.findByUser(owner_id);

    if (isAlreadyExists) {
      throw new WalletAlreadyExistError();
    }

    await this.cartRepository.create({
      buyer_id: owner_id,
    });

    const walletCreate = await this.walletRepository.create({
      owner_id,
      owner_name,
    });
    return walletCreate;
  }
}
