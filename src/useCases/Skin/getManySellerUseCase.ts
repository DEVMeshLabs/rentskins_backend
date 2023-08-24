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
    seller_id: string,
    page: number,
    pageSize: number
  ): Promise<GetManySellerUseCaseResponse> {
    const countSkins = await this.skinRepository.findByCountSellers(seller_id);
    const totalPages = Math.ceil(countSkins / pageSize);

    const skins = await this.skinRepository.findByManySeller(
      seller_id,
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
