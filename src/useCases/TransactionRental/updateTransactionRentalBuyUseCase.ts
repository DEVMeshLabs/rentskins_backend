import type { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { TransactionNotExistError } from "../@errors/Transaction/TransactionNotExistError";
import type { IRentalTransactionRepository } from "@/repositories/interfaceRepository/IRentalTransactionRepository";
import type { IWalletRepository } from "@/repositories/interfaceRepository/IWalletRepository";
import type {
  Skin,
  RentalTransaction as PrismaRentalTransaction,
} from "@prisma/client";
import type { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import type { INotificationRepository } from "@/repositories/interfaceRepository/INotificationRepository";

interface RentalTransaction extends PrismaRentalTransaction {
  skinsRent?: Skin[];
}

export class UpdateTransactionRentalBuyUseCase {
  constructor(
    private transactionRentalRepository: IRentalTransactionRepository,
    private skinRepository: ISkinsRepository,
    private walletRepository: IWalletRepository,
    private perfilRepository: IPerfilRepository,
    private notificationRepository: INotificationRepository
  ) {}

  async execute(id: string): Promise<void> {
    const commissionRate = 0.05; // 5% de comissão

    const findTransactionid: RentalTransaction =
      await this.transactionRentalRepository.findById(id);

    if (!findTransactionid) {
      throw new TransactionNotExistError();
    }

    const skinids = findTransactionid.skinsRent.map((skin: Skin) => skin.id);

    const totalSkinPrice = findTransactionid.skinsRent.reduce(
      (total, skin) => total + skin.skin_price,
      0
    );
    const sellerId = findTransactionid.skinsRent[0].seller_id;
    const sellerAmount = totalSkinPrice * (1 - commissionRate); // Subtrai a comissão de 5%

    await Promise.all([
      this.transactionRentalRepository.updateId(id, {
        status: "Completed",
        updatedAt: new Date(),
      }),
      this.skinRepository.updateMany(skinids, "Completed"),
      this.walletRepository.updateByUserValue(
        sellerId,
        "increment",
        sellerAmount
      ),
      this.notificationRepository.create({
        owner_id: sellerId,
        description: `O aluguel da skin foi concluído com sucesso. O valor de ${sellerAmount} foi adicionado à sua carteira.`,
      }),
      this.notificationRepository.create({
        owner_id: findTransactionid.buyerId,
        description: `O aluguel da skin foi concluído com sucesso.`,
      }),
      this.perfilRepository.updateTotalExchanges([
        findTransactionid.skinsRent[0].seller_id,
      ]),
    ]);
  }
}
