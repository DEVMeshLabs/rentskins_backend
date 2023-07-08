import { ISkinsRepository } from "@/repositories/interface/ISkinsRepository";
import { Skin } from "@prisma/client";

export class GetManyWeaponUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(skin_weapon: string): Promise<Skin[]> {
    const skinsWeapon = await this.skinRepository.findByWeapon(skin_weapon);
    return skinsWeapon;
  }
}
