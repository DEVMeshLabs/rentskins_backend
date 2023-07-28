import { CreateSkinsUseCaseRequest } from "@/@types/ICreateSkinsRequest";
import { ISkinsRepository } from "@/repositories/interface/ISkinsRepository";
import { Prisma } from "@prisma/client";

export class CreateSkinUseCase {
  constructor(private skinsRepository: ISkinsRepository) {}
  async execute({
    skin_image,
    skin_name,
    skin_category,
    skin_weapon,
    skin_price,
    skin_float,
    skin_color,
    skin_link_game,
    skin_link_steam,
    seller_name,
    seller_id,
    buyer_name,
    buyer_id,
    status,
    status_float,
    sale_type,
  }: CreateSkinsUseCaseRequest): Promise<Prisma.BatchPayload> {
    const skins = await this.skinsRepository.create({
      skin_image,
      skin_name,
      skin_category,
      skin_weapon,
      skin_price,
      skin_float,
      skin_color,
      skin_link_game,
      skin_link_steam,
      seller_name,
      seller_id,
      buyer_name,
      buyer_id,
      status,
      status_float,
      sale_type,
    });

    return skins;
  }
}
