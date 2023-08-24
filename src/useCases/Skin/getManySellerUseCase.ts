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
    const skinsSeller = await this.skinRepository.findByManySeller(
      seller_id,
      page,
      pageSize
    );

    const countSkins = skinsSeller.length;

    const totalPages = Math.ceil(countSkins / pageSize);

    return {
      totalPages,
      totalItens: countSkins,
      skinsSeller,
    };
  }
}
