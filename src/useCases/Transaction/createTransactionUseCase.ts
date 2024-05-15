// ------------------ Repositorys -----------------
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
// ------------------ Errors -----------------
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import { SameUsersError } from "../@errors/Skin/SameUsersError";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";
import { InsufficientFundsError } from "../@errors/Wallet/InsufficientFundsError";
import { CannotAdvertiseSkinNotYour } from "../@errors/Transaction/CannotAdvertiseSkinNotYour";
import { SkinHasAlreadyBeenSoldError } from "../@errors/Transaction/SkinHasAlreadyBeenSoldError";
import { WalletNotExistsError } from "../@errors/Wallet/WalletNotExistsError";
// ------------------ Outros -----------------
import { ITransactionHistoryRepository } from "@/repositories/interfaceRepository/ITransactionHistoryRepository";
import { addHours } from "@/utils/compareDates";

interface ITransactionRequest {
  seller_id: string;
  buyer_id: string;
  skin_id: string;
}

export class CreateTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private transactionHisotry: ITransactionHistoryRepository,
    private perfilRepository: IPerfilRepository,
    private skinRepository: ISkinsRepository,
    private walletRepository: IWalletRepository,
    private notificationsRepository: INotificationRepository,
    private configurationRepository: IConfigurationRepository
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
      this.configurationRepository.findByUser(seller_id),
    ]);

    if (!perfilBuyer || !perfilSeller) {
      throw new PerfilNotExistError();
    } else if (perfilBuyer === perfilSeller) {
      throw new SameUsersError();
    } else if (!findSkin) {
      throw new SkinNotExistError();
    } else if (!findWallet) {
      throw new WalletNotExistsError();
    } else if (findWallet.value < findSkin.skin_price) {
      throw new InsufficientFundsError();
    } else if (findSkin.seller_id !== seller_id) {
      throw new CannotAdvertiseSkinNotYour();
    } else if (
      findSkinTransaction &&
      findSkinTransaction.status !== null &&
      findSkinTransaction.status !== "Falhou"
    ) {
      throw new SkinHasAlreadyBeenSoldError(
        `${findSkin.skin_name} ${findSkin.asset_id}`
      );
    }

    const formattedBalance = findSkin.skin_price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });

    const [createTransaction] = await Promise.all([
      this.transactionRepository.create({
        skin_id,
        seller_id,
        buyer_id,
        balance: findSkin.skin_price,
      }),

      this.notificationsRepository.create({
        owner_id: perfilSeller.owner_id,
        description: `A transação do item ${findSkin.skin_name} foi iniciada por ${formattedBalance}.`,
        type: "Input",
        skin_id: findSkin.id,
      }),

      this.notificationsRepository.create({
        owner_id: perfilBuyer.owner_id,
        description: `A transação do item ${findSkin.skin_name} foi iniciada por ${formattedBalance}.`,
        type: "Input",
        skin_id: findSkin.id,
      }),

      this.walletRepository.updateByUserValue(
        perfilBuyer.owner_id,
        "decrement",
        findSkin.skin_price
      ),
      this.perfilRepository.updateByUser(perfilSeller.owner_id, {
        total_exchanges: perfilSeller.total_exchanges + 1,
      }),
      this.skinRepository.updateById(skin_id, {
        status: "Em andamento",
      }),
    ]);
    // O dateProcess tem que pegar a data atual e aumentar 2horas
    await this.transactionHisotry.create({
      transaction_id: createTransaction.id,
      seller_id,
      buyer_id,
      asset_id: findSkin.asset_id,
      dateProcess: addHours(2),
    });

    return createTransaction;
  }
}
