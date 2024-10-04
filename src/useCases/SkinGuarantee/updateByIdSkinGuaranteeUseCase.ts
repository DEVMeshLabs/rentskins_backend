import { Prisma, GuaranteeSkin } from "@prisma/client";
import { SkinNotExistError } from "../@errors/Skin/SkinNotExistsError";
import type { ISkinGuaranteeRepository } from "@/repositories/interfaceRepository/ISkinGuarantee";

export class UpdateByIdSkinGuaranteeUseCase {
  constructor(private skinGuaranteeRepository: ISkinGuaranteeRepository) {}

  async execute(
    id: string,
    data: Prisma.GuaranteeSkinUncheckedUpdateInput
  ): Promise<GuaranteeSkin> {
    const findSkin = await this.skinGuaranteeRepository.findById(id);

    if (!findSkin) {
      throw new SkinNotExistError();
    }

    const updatedSkin = await this.skinGuaranteeRepository.updateById(id, data);
    return updatedSkin;
  }
}
