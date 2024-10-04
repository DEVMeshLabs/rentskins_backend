import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Skin } from "@prisma/client";

export class GetManyWeaponUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(skin_weapon: string): Promise<Skin[]> {
    const skinsToWeapon = await this.skinRepository.findByManyWeapon(
      skin_weapon
    );

    return skinsToWeapon;
  }
}
