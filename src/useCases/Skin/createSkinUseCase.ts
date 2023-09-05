import { ISkinsRepository } from "@/repositories/interfaceRepository/ISkinsRepository";
import { Prisma } from "@prisma/client";
import { SkinAlreadyExistsError } from "../@errors/Skin/SkinAlreadyExistsError";

export class CreateSkinUseCase {
  constructor(private skinsRepository: ISkinsRepository) {}
  async execute(data: Prisma.SkinCreateInput): Promise<Prisma.BatchPayload> {
    const alreadySkin = await this.skinsRepository.findManyAssent();

    const verify = alreadySkin.filter(
      (item) => item.asset_id === data.asset_id
    );

    if (verify) {
      throw new SkinAlreadyExistsError(`${verify[0].skin_name}`);
    }

    const skins = await this.skinsRepository.create({ ...data });
    return skins;
  }
}
