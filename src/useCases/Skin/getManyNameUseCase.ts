import { ISkinsRepository } from "@/repositories/interface/ISkinsRepository";
import { Skin } from "@prisma/client";

export class GetManyNameUseCase {
  constructor(private skinRepository: ISkinsRepository) {}

  async execute(name: string): Promise<Skin[]> {
    const findName = await this.skinRepository.findByName(name);
    return findName;
  }
}
