import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Prisma, Skin } from "@prisma/client";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";

export class UpdateSkinUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(id: string, data: Prisma.SkinUpdateInput): Promise<Skin> {
    const skinId = await this.skinRepository.findById(id);

    if (!skinId) {
      throw new SkinNotExistError();
    }

    const updateId = await this.skinRepository.updateById(id, data);
    return updateId;
  }
}
