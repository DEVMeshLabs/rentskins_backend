import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Skin } from "@prisma/client";

export class GetSkinManyUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(page: number): Promise<Skin[]> {
    const skins = await this.skinRepository.findByMany(page);
    return skins;
  }
}
