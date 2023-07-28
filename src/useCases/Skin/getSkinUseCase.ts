import { ISkinsRepository } from "@/repositories/interface/ISkinsRepository";
import { Skin } from "@prisma/client";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";

export class GetSkinUseCase {
  constructor(private getSkinRepository: ISkinsRepository) {}

  async execute(id: string): Promise<Skin> {
    const skin = await this.getSkinRepository.findById(id);

    if (!skin) {
      throw new SkinNotExistError();
    }

    return skin;
  }
}
