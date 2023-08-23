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
    search: string,
    page: number,
    pageSize: number
  ): Promise<GetManySearchUseCaseResponse> {
    const countSkins = await this.skinRepository.findByCount();
    const totalPages = Math.ceil(countSkins / pageSize);

    const skins = await this.skinRepository.findBySearch(
      search,
      page,
      pageSize
    );

    return {
      totalPages,
      totalItens: countSkins,
      skins,
    };
  }
}
