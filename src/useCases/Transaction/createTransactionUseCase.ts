import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import { SameUsersError } from "../@errors/Skin/SameUsersError";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { InsufficientFundsError } from "../@errors/Wallet/InsufficientFundsError";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { CannotAdvertiseSkinNotYour } from "../@errors/Transaction/CannotAdvertiseSkinNotYour";
import { SkinHasAlreadyBeenSoldError } from "../@errors/Transaction/SkinHasAlreadyBeenSoldError";

interface ITransactionRequest {
  seller_id: string;
  buyer_id: string;
  skin_id: string;
}

export class CreateTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private perfilRepository: IPerfilRepository,
    private skinRepository: ISkinsRepository,
    private walletRepository: IWalletRepository,
    private notificationsRepository: INotificationRepository
  ) {}

  async execute({ seller_id, buyer_id, skin_id }: ITransactionRequest) {
    const [
      perfilBuyer,
      perfilSeller,
      findSkin,
      findWallet,
      findSkinTransaction,
    ] = await Promise.all([
      this.perfilRepository.findByUser(buyer_id),
      this.perfilRepository.findByUser(seller_id),
      this.skinRepository.findById(skin_id),
      this.walletRepository.findByUser(buyer_id),
      this.transactionRepository.findBySkinTransaction(skin_id),
    ]);

    if (!perfilBuyer || !perfilSeller) {
      throw new PerfilNotExistError();
    } else if (perfilBuyer === perfilSeller) {
      throw new SameUsersError();
    } else if (!findSkin) {
      throw new SkinNotExistError();
    } else if (findWallet.value < findSkin.skin_price) {
      throw new InsufficientFundsError();
    } else if (findSkin.seller_id !== seller_id) {
      throw new CannotAdvertiseSkinNotYour();
    } else if (findSkinTransaction) {
      throw new SkinHasAlreadyBeenSoldError();
    }

    const [createTransaction] = await Promise.all([
      this.transactionRepository.create({
        skin_id,
        seller_id,
        buyer_id,
        balance: findSkin.skin_price,
      }),

      this.notificationsRepository.create({
        owner_id: seller_id,
        description: `Venda do item ${
          findSkin.skin_name
        }, realizada por ${findSkin.skin_price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        })}.`,
        type: "Input",
        skin_id: findSkin.id,
      }),

      this.notificationsRepository.create({
        owner_id: buyer_id,
        description: `Compra do item ${
          findSkin.skin_name
        } realizada por ${findSkin.skin_price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        })}.`,
        type: "Input",
        skin_id: findSkin.id,
      }),

      this.walletRepository.updateByUserValue(
        buyer_id,
        "decrement",
        findSkin.skin_price
      ),

      this.perfilRepository.updateByUser(seller_id, {
        total_exchanges: perfilSeller.total_exchanges + 1,
      }),
    ]);

    return createTransaction;
  }
}
