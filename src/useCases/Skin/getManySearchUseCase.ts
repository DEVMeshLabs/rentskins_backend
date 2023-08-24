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
    const skins = await this.skinRepository.findBySearch(
      search,
      page,
      pageSize
    );

    const countSkins = skins.length;
    const totalPages = Math.ceil(countSkins / pageSize);

    return {
      totalPages,
      totalItens: countSkins,
      skins,
    };
  }
}
