import type { ISkinGuaranteeRepository } from "@/repositories/interfaceRepository/ISkinGuarantee";
import { GuaranteeSkin } from "@prisma/client";

export class GetManyAssetsSkinGuaranteeUseCase {
  constructor(private skinGuaranteeRepository: ISkinGuaranteeRepository) {}

  async execute(assetIds: string[]): Promise<GuaranteeSkin[]> {
    const findSkinsGuarantee = await this.skinGuaranteeRepository.findByAssets(
      assetIds
    );
    return findSkinsGuarantee;
  }
}
