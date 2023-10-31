import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";

export class GetUserPerfilUseCase {
  constructor(private perfilRepository: IPerfilRepository) {}

  async execute(owner_id: string): Promise<any> {
    const foundUserProfile = await this.perfilRepository.findByUser(owner_id);

    if (!foundUserProfile) {
      throw new PerfilNotExistError();
    }

    const { configurationId, ...perfilWithoutConfigId } = foundUserProfile;

    return perfilWithoutConfigId;
  }
}
