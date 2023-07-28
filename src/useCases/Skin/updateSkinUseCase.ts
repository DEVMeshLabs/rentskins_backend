import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Skin } from "@prisma/client";
import { ISkinUpdate } from "@/interface/Skin/ISkinUpdate";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";

export class UpdateSkinUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(id: string, data: ISkinUpdate): Promise<Skin> {
    const skinId = await this.skinRepository.findById(id);

    if (!skinId) {
      throw new SkinNotExistError();
    }

    const updateId = await this.skinRepository.updateById(id, data);
    return updateId;
  }
}
