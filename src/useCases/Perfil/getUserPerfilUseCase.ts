import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";

export class GetUserPerfilUseCase {
  constructor(private perfilRepository: IPerfilRepository) {}

  async execute(owner_id: string): Promise<any> {
    const findUser = await this.perfilRepository.findByUser(owner_id);

    if (!findUser) {
      throw new PerfilNotExistError();
    }

    const { configurationId, ...perfilWithoutConfigId } = findUser;

    return perfilWithoutConfigId;
  }
}
