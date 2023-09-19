import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Skin } from "@prisma/client";

interface GetManySearchUseCaseResponse {
  totalPages: number;
  totalItens: number;
  skins: Skin[];
}

export class GetManySearchUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(
    searchString: string,
    pageNumber: number,
    itemsPerPage: number
  ): Promise<GetManySearchUseCaseResponse> {
    const totalSkinsFound = await this.skinRepository.findByCountSearch(
      searchString
    );

    const skins = await this.skinRepository.findBySearch(
      searchString,
      pageNumber,
      itemsPerPage
    );

    const totalPages = Math.ceil(totalSkinsFound / itemsPerPage);

    return {
      totalPages,
      totalItens: totalSkinsFound,
      skins,
    };
  }
}
