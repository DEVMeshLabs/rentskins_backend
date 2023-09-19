import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Skin } from "@prisma/client";

interface GetManySellerUseCaseResponse {
  totalPages: number;
  totalItens: number;
  skins: Skin[];
}

export class GetManySellerUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(
    sellerId: string,
    pageNumber: number,
    itemsPerPage: number,
    deletedAtFilter: string
  ): Promise<GetManySellerUseCaseResponse> {
    const totalSkinsFound = await this.skinRepository.findByCountSellers(
      sellerId
    );
    const totalPages = Math.ceil(totalSkinsFound / itemsPerPage);

    const skins = await this.skinRepository.findByManySeller(
      sellerId,
      pageNumber,
      itemsPerPage,
      deletedAtFilter
    );

    return {
      totalPages,
      totalItens: totalSkinsFound,
      skins,
    };
  }
}
