import { ISkinsRepository } from "@/repositories/interface/ISkinsRepository";
import { Skin } from "@prisma/client";
import { SellerNotExistError } from "./errors/SellerNotExistError";

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
