import { ISkinsRepository } from "@/repositories/interface/ISkinsRepository";

import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";
import { Skin } from "@prisma/client";

export class DeleteSkinUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(id: string): Promise<Skin> {
    const skinId = await this.skinRepository.findById(id);

    if (!skinId) {
      throw new SkinNotExistError();
    }

    const deleteSkin = await this.skinRepository.deleteSkin(id);
    return deleteSkin;
  }
}
