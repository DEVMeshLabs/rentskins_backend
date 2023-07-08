import { ISkinsRepository } from "@/repositories/interface/ISkinsRepository";
import { SkinNotExistError } from "./errors/SkinNotExistsError";
import { Skin } from "@prisma/client";

interface GetSkinManyRequest {
  skin: Skin;
}

export class GetSkinUseCase {
  constructor(private getSkinRepository: ISkinsRepository) {}

  async execute(id: string): Promise<GetSkinManyRequest> {
    const skin = await this.getSkinRepository.findById(id);

    if (!skin) {
      throw new SkinNotExistError();
    }

    return { skin };
  }
}
