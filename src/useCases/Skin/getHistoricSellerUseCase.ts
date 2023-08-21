import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { SellerNotExistError } from "../@errors/Skin/SellerNotExistError";

export class GetHistoricSellerUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(seller_id: string): Promise<any> {
    const findSellerId = this.skinRepository.findBySeller(seller_id);

    if (!findSellerId) {
      throw new SellerNotExistError();
    }

    const findHistoricId = await this.skinRepository.findHistoricId(seller_id);
    return findHistoricId;
  }
}
