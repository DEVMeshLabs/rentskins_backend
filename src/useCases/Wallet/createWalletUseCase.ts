import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { Prisma, Wallet } from "@prisma/client";
import { WalletAlreadyExistError } from "../@errors/Wallet/WalletAlreadyExistsError";
import { ICartRepository } from "@/repositories/interfaceRepository/ICartRepository";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";

export class CreateWalletUseCase {
  constructor(
    private walletRepository: IWalletRepository,
    private cartRepository: ICartRepository,
    private perfilRepository: IPerfilRepository
  ) {}

  async execute({
    owner_id,
    owner_name,
  }: Prisma.WalletCreateInput): Promise<Wallet> {
    const [isAlreadyWallet, isNotExist] = await Promise.all([
      this.walletRepository.findByUser(owner_id),
      this.perfilRepository.findByUser(owner_id),
    ]);

    if (isAlreadyWallet) throw new WalletAlreadyExistError();
    if (!isNotExist) throw new PerfilNotExistError();

    const cartResponse = await this.cartRepository.create({
      buyer_id: owner_id,
    });
    const walletResponse = await this.walletRepository.create({
      owner_id,
      owner_name,
    });
    await this.perfilRepository.updateByCart(owner_id, cartResponse.id);
    return walletResponse;
  }
}
