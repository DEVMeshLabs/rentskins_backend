import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";

export class GetLastSellerSkinsUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(name: string): Promise<any> {
    const lastSellerSkins = await this.skinRepository.findLastSellerSkins(name);

    const response = lastSellerSkins.map((skin) => {
      const seller_name = skin.seller_name;
      const price = skin.skin_price;
      const date = skin.createdAt;

      return {
        seller_name,
        price,
        date,
      };
    });

    return response;
  }
}
