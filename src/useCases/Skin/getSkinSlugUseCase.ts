import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Skin } from "@prisma/client";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";

export class GetSkinSlugUseCase {
  constructor(private getSkinRepository: ISkinsRepository) {}

  async execute(slug: string): Promise<Skin> {
    const skin = await this.getSkinRepository.findBySlug(slug);

    if (!skin) {
      throw new SkinNotExistError();
    }

    return skin;
  }
}
