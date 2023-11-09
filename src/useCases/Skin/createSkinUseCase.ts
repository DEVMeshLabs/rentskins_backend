import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Prisma } from "@prisma/client";
import { SkinAlreadyExistsError } from "../@errors/Skin/SkinAlreadyExistsError";

export class CreateSkinUseCase {
  constructor(private skinsRepository: ISkinsRepository) {}
  async execute(data: Prisma.SkinCreateInput): Promise<any> {
    const existingSkins = await this.skinsRepository.findManyAssent();

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
    }

    const createdSkins = await this.skinsRepository.create({ ...data });

    return createdSkins;
  }
}
