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
    page: number,
    pageSize: number
  ): Promise<GetSkinManyUseCaseResponse> {
    const countSkins = await this.skinRepository.findByCount();
    const totalPages = Math.ceil(countSkins / pageSize);

    const skins = await this.skinRepository.findByMany(page, pageSize);

    return {
      totalPages,
      totalItens: countSkins,
      skins,
    };
  }
}
