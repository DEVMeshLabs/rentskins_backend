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
import { WalletNotExistsError } from "../@errors/Wallet/WalletNotExistsError";
import { makeProcessTransaction } from "../@factories/Transaction/makeProcessTransaction";
import { calculateReliability } from "@/utils/calculateReliability";

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
    } else if (!findWallet) {
      throw new WalletNotExistsError();
    } else if (findWallet.value < findSkin.skin_price) {
      throw new InsufficientFundsError();
    } else if (findSkin.seller_id !== seller_id) {
      throw new CannotAdvertiseSkinNotYour();
    } else if (findSkinTransaction) {
      throw new SkinHasAlreadyBeenSoldError(findSkin.skin_name);
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
        description: `Venda do item ${findSkin.skin_name}, realizada por ${formattedBalance}.`,
        type: "Input",
        skin_id: findSkin.id,
      }),

      this.notificationsRepository.create({
        owner_id: perfilBuyer.owner_id,
        description: `Compra do item ${findSkin.skin_name} realizada por ${formattedBalance}.`,
        type: "Input",
        skin_id: findSkin.id,
      }),

      this.walletRepository.updateByUserValue(
        perfilBuyer.owner_id,
        "decrement",
        findSkin.skin_price
      ),
    ]);

    await this.perfilRepository.updateByUser(perfilSeller.owner_id, {
      total_exchanges: perfilSeller.total_exchanges + 1,
    });
    await this.skinRepository.updateById(skin_id, {
      status: "Em andamento",
    });

    if (perfilSeller.total_exchanges > 2) {
      const reliability = await calculateReliability(perfilSeller.owner_id);
      await this.perfilRepository.updateByUser(perfilSeller.owner_id, {
        reliability,
      });
    }

    setTimeout(async () => {
      const processTransaction = makeProcessTransaction();
      console.log("Iniciando cronnnnnnnnnnnnnnnnnnnnnnnn.");
      await processTransaction.execute(
        createTransaction,
        findSkin,
        perfilBuyer,
        perfilSeller
      );
      console.log("Finalizando cronnnnnnnnnnnnnnnnnnnnnnnn.");
    }, 60000 * 15);
    // cron.schedule("30 * * * * *", async () => {});

    return createTransaction;
  }
}
