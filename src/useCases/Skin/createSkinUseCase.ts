import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Prisma } from "@prisma/client";
import { SkinAlreadyExistsError } from "../@errors/Skin/SkinAlreadyExistsError";
import { slug } from "@/utils/slug";
import { KeySteamNotFoundError } from "../@errors/TransactionHistory/KeySteamNotFoundError";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";

export class CreateSkinUseCase {
  constructor(
    private skinsRepository: ISkinsRepository,
    private configRepostiory: IConfigurationRepository
  ) {}

  async execute(data: Prisma.SkinCreateInput): Promise<any> {
    const existingSkins = await this.skinsRepository.findManyAssent();
    const configSeller = await this.configRepostiory.findByUser(data.seller_id);
    const duplicateSkins = existingSkins.filter(
      (item) => item.asset_id === data.asset_id && item.status !== "Falhou"
    );

    if (duplicateSkins.length > 0) {
      const idSkin = duplicateSkins[0].id;
      const duplicateSkinName = duplicateSkins[0].skin_name;
      const duplicateSkinAssetId = duplicateSkins[0].asset_id;
      throw new SkinAlreadyExistsError(
        duplicateSkinName,
        idSkin,
        duplicateSkinAssetId
      );
    } else if (!configSeller.key) {
      throw new KeySteamNotFoundError();
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
