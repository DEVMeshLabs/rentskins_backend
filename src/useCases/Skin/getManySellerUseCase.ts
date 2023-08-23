import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Skin } from "@prisma/client";

interface GetManySellerUseCaseResponse {
  totalPages: number;
  totalItens: number;
  skinsSeller: Skin[];
}

export class GetManySellerUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(
    seller_id: string,
    page: number,
    pageSize: number
  ): Promise<GetManySellerUseCaseResponse> {
    const countSkins = await this.skinRepository.findByCount();
    const totalPages = Math.ceil(countSkins / pageSize);

    const skinsSeller = await this.skinRepository.findByManySeller(
      seller_id,
      page,
      pageSize
    );

    return {
      totalPages,
      totalItens: countSkins,
      skinsSeller,
    };
  }
}
