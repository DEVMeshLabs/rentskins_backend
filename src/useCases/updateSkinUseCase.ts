import { ISkinsRepository } from "@/repositories/interface/ISkinsRepository";
import { Skin } from "@prisma/client";
import { SkinNotExistError } from "./errors/SkinNotExistsError";
import { ISkinUpdate } from "@/interface/Skin/ISkinUpdate";

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
