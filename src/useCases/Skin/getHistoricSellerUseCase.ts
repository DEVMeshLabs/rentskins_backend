import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { SellerNotExistError } from "../@errors/Skin/SellerNotExistError";

export class GetHistoricSellerUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(seller_id: string): Promise<any> {
    const foundSeller = this.skinRepository.findBySeller(seller_id);

    if (!foundSeller) {
      throw new SellerNotExistError();
    }

    const sellerHistoric = await this.skinRepository.findHistoricId(seller_id);
    return sellerHistoric;
  }
}
