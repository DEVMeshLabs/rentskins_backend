import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Skin } from "@prisma/client";
import { SellerNotExistError } from "../@errors/Skin/SellerNotExistError";

export class GetSkinSellerUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(seller_id: string): Promise<Skin> {
    const findSeller = await this.skinRepository.findBySeller(seller_id);

    if (!findSeller) {
      throw new SellerNotExistError();
    }

    return findSeller;
  }
}
