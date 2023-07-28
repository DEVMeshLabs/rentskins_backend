import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Skin } from "@prisma/client";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";

export class GetSkinManyUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(): Promise<Skin[]> {
    const skins = await this.skinRepository.findByMany();

    if (skins.length <= 0) {
      throw new SkinNotExistError();
    }

    return skins;
  }
}
