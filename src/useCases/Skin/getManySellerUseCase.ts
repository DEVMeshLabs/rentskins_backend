import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Skin } from "@prisma/client";

interface GetManySellerUseCaseResponse {
  skins: Skin[];
}

export class GetManySellerUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(
    sellerId: string,
    deletedAtFilter: string
  ): Promise<GetManySellerUseCaseResponse> {
    // const totalSkinsFound = await this.skinRepository.findByCountSellers(
    //   sellerId
    // );
    // const totalPages = Math.ceil(totalSkinsFound / itemsPerPage);

    const skins = await this.skinRepository.findByManySeller(
      sellerId,
      deletedAtFilter
    );

    return {
      skins,
    };
  }
}
