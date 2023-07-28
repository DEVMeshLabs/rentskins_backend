import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Skin } from "@prisma/client";

export class GetManySellerUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(seller_id: string): Promise<Skin[]> {
    const sellerAll = await this.skinRepository.findByManySeller(seller_id);
    return sellerAll;
  }
}
