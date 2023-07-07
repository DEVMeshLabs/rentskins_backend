import { ISkinsRepository } from "@/repositories/interface/ISkinsRepository";
import { SkinNotExistError } from "./errors/SkinNotExistsError";

export class GetSkinSellerUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(seller_id: string) {
    const findSeller = await this.skinRepository.findBySeller(seller_id);

    if (!findSeller) {
      throw new SkinNotExistError();
    }

    return findSeller;
  }
}
