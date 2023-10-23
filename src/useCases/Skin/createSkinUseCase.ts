import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Prisma } from "@prisma/client";
import { SkinAlreadyExistsError } from "../@errors/Skin/SkinAlreadyExistsError";

export class CreateSkinUseCase {
  constructor(private skinsRepository: ISkinsRepository) {}
  async execute(data: Prisma.SkinCreateInput): Promise<Prisma.BatchPayload> {
    const existingSkins = await this.skinsRepository.findManyAssent();

    const duplicateSkins = existingSkins.filter(
      (item) => item.asset_id === data.asset_id && item.status !== "Falhou"
    );

    if (duplicateSkins.length > 0) {
      throw new SkinAlreadyExistsError(`${duplicateSkins[0].skin_name}`);
    }

    const createdSkins = await this.skinsRepository.create({ ...data });

    return createdSkins;
  }
}
