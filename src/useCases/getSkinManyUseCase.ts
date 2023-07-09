import { ISkinsRepository } from "@/repositories/interface/ISkinsRepository";
import { Skin } from "@prisma/client";
import { SkinNotExistError } from "./errors/SkinNotExistsError";

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
