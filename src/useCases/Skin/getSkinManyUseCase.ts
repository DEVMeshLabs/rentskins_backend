import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Skin } from "@prisma/client";

interface GetSkinManyUseCaseResponse {
  totalPages: number;
  totalItens: number;
  skins: Skin[];
}

export class GetSkinManyUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(
    pageNumber: number,
    itemsPerPage: number,
    type: string
  ): Promise<GetSkinManyUseCaseResponse> {
    const totalSkinsFound = await this.skinRepository.findByCountSkins();
    const totalPages = Math.ceil(totalSkinsFound / itemsPerPage);

    const skins = await this.skinRepository.findByMany(
      pageNumber,
      itemsPerPage,
      type
    );

    return {
      totalPages,
      totalItens: totalSkinsFound,
      skins,
    };
  }
}
