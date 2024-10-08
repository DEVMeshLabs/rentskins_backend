import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Prisma } from "@prisma/client";
import { SkinAlreadyExistsError } from "../@errors/Skin/SkinAlreadyExistsError";
import { KeySteamNotFoundError } from "../@errors/TransactionHistory/KeySteamNotFoundError";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { ConfigurationNotExistError } from "../@errors/Configuration/ConfigurationNotExistError";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";
import { SkinHasAlreadyBeenSoldOrAnnounced } from "../@errors/Skin/SkinHasAlreadyBeenSoldOrAnnounced";

export class CreateSkinUseCase {
  constructor(
    private skinsRepository: ISkinsRepository,
    private configRepostiory: IConfigurationRepository,
    private transactionRepository: ITransactionRepository
  ) {}

  async execute(data: Prisma.SkinCreateInput): Promise<any> {
    const existingSkins = await this.skinsRepository.findManyAssent();
    const existingTransaction = await this.transactionRepository.findByMany();
    const configSeller = await this.configRepostiory.findByUser(data.seller_id);

    const duplicateSkins = existingSkins.filter(
      (item) => item.asset_id === data.asset_id
    );

    const findSkinTransaction: any = existingTransaction.filter((item: any) => {
      return (
        item.skin.asset_id === data.asset_id &&
        (item.status === "Default" ||
          item.status === "NegociationAccepted" ||
          item.status === "NegotiationSend")
      );
    });

    if (!configSeller) {
      throw new ConfigurationNotExistError();
    } else if (!configSeller.key) {
      throw new KeySteamNotFoundError();
    }

    if (duplicateSkins.length > 0) {
      const idSkin = duplicateSkins[0].id;
      const duplicateSkinName = duplicateSkins[0].skin_name;
      const duplicateSkinAssetId = duplicateSkins[0].asset_id;
      throw new SkinAlreadyExistsError(
        duplicateSkinName,
        idSkin,
        duplicateSkinAssetId
      );
    } else if (findSkinTransaction.length > 0) {
      const transactionDuplicate = findSkinTransaction[0].skin.skin_name;
      throw new SkinHasAlreadyBeenSoldOrAnnounced(transactionDuplicate);
    }
    const createdSkins = await this.skinsRepository.create(data);

    return createdSkins;
  }
}
