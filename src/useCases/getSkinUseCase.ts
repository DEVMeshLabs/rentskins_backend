import { ISkinsRepository } from "@/repositories/interface/ISkinsRepository";
import { SkinNotExist } from "./errors/SkinNotExists";

export class GetSkinUseCase {
  constructor(private getSkinRepository: ISkinsRepository) {}

  async execute(id: string) {
    const skinId = await this.getSkinRepository.findById(id);

    if (!skinId) {
      throw new SkinNotExist();
    }

    return skinId;
  }
}
