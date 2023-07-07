import { ISkinsRepository } from "@/repositories/interface/ISkinsRepository";

export class GetSkinUseCase {
  constructor(private getSkinRepository: ISkinsRepository) {}

  async execute(id: string) {
    const skinId = await this.getSkinRepository.findById(id);
    return skinId;
  }
}
