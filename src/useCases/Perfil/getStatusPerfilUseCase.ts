import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";

export class GetStatusPerfilUseCase {
  constructor(private perfilInfoRepository: IPerfilRepository) {}

  async execute(owner_id: string): Promise<any> {
    const foundProfile = await this.perfilInfoRepository.findByUser(owner_id);

    if (!foundProfile) {
      throw new PerfilNotExistError();
    }

    return {
      status: foundProfile.account_status,
    };
  }
}
