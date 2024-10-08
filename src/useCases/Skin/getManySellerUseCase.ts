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
    const skins = await this.skinRepository.findByManySeller(
      sellerId,
      deletedAtFilter
    );

    return {
      skins,
    };
  }
}
