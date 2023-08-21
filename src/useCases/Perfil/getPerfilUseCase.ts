import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import { IGetProfileInterface } from "@/@types/IGetProfileInterface";

export class GetPerfilUseCase {
  constructor(private perfilInfoRepository: IPerfilRepository) {}

  async execute(id: string): Promise<IGetProfileInterface> {
    const perfilId = await this.perfilInfoRepository.findById(id);

    if (!perfilId) {
      throw new PerfilNotExistError();
    }

    const { configurationId, ...perfilWithoutConfigId } = perfilId;

    return perfilWithoutConfigId;
  }
}
