import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Skin } from "@prisma/client";

export class GetManyCategoryUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(skin_category: string): Promise<Skin[]> {
    const skinsCategory = await this.skinRepository.findByManyCategory(
      skin_category
    );
    return skinsCategory;
  }
}
