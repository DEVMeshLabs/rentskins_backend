import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import { IGetProfileInterface } from "@/@types/IGetProfileInterface";

export class GetPerfilUseCase {
  constructor(private perfilInfoRepository: IPerfilRepository) {}

  async execute(id: string): Promise<IGetProfileInterface> {
    const foundProfile = await this.perfilInfoRepository.findById(id);

    if (!foundProfile) {
      throw new PerfilNotExistError();
    }

    const { configurationId, ...perfilWithoutConfigId } = foundProfile;

    return perfilWithoutConfigId;
  }
}
