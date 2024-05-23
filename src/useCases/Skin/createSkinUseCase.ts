import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Prisma } from "@prisma/client";
import { SkinAlreadyExistsError } from "../@errors/Skin/SkinAlreadyExistsError";
import { slug } from "@/utils/slug";
import { KeySteamNotFoundError } from "../@errors/TransactionHistory/KeySteamNotFoundError";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { ConfigurationNotExistError } from "../@errors/Configuration/ConfigurationNotExistError";
import { ITransactionRepository } from "@/repositories/interfaceRepository/ITransactionRepository";

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

    const findSkinTransaction = existingTransaction.filter((item: any) => {
      return item.skin.asset_id === data.asset_id;
    });

    console.log("Transação: ", findSkinTransaction);

    if (!configSeller) {
      throw new ConfigurationNotExistError();
    } else if (!configSeller.key) {
      throw new KeySteamNotFoundError();
    }

    if (duplicateSkins.length > 0 || findSkinTransaction.length > 0) {
      const idSkin = duplicateSkins[0].id;
      const duplicateSkinName = duplicateSkins[0].skin_name;
      const duplicateSkinAssetId = duplicateSkins[0].asset_id;
      throw new SkinAlreadyExistsError(
        duplicateSkinName,
        idSkin,
        duplicateSkinAssetId
      );
    }

    const skinSlug = await slug(
      data.skin_category,
      data.skin_weapon,
      data.asset_id
    );

    const skin = {
      ...data,
      slug: skinSlug,
    };

    const createdSkins = await this.skinsRepository.create(skin);

    return createdSkins;
  }
}
