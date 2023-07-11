import { ISkinsRepository } from "@/repositories/interface/ISkinsRepository";
import { Skin } from "@prisma/client";
import { SkinAlreadyExistsError } from "../errors/Skin/SkinAlreadyExistsError";

interface CreateSkinsUseCaseRequest {
  skin_image: string;
  skin_name: string;
  skin_category: string;
  skin_weapon: string;
  skin_price: string;
  skin_float: string;
  skin_color: string;
  skin_link_game: string;
  skin_link_steam: string;
  seller_name: string;
  seller_id: string;
  buyer_name?: string;
  buyer_id?: string;
  status: string;
  status_float: string;
  sale_type: string;
}

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
  }: CreateSkinsUseCaseRequest): Promise<Skin> {
    const isSkinAlreadyExist = await this.skinsRepository.findBySeller(
      seller_id
    );
    console.log(isSkinAlreadyExist);
    if (isSkinAlreadyExist) {
      throw new SkinAlreadyExistsError();
    }

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
