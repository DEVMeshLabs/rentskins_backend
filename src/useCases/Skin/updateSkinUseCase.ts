import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Prisma, Skin } from "@prisma/client";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";

export class UpdateSkinUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(id: string, data: Prisma.SkinUpdateInput): Promise<Skin> {
    const foundSkin = await this.skinRepository.findById(id);

    if (!foundSkin) {
      throw new SkinNotExistError();
    }

    const updatedSkin = await this.skinRepository.updateById(id, data);
    return updatedSkin;
  }
}
