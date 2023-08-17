import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";

export class GetStatusPerfilUseCase {
  constructor(private perfilInfoRepository: IPerfilRepository) {}

  async execute(owner_id: string): Promise<any> {
    const perfilId = await this.perfilInfoRepository.findByUser(owner_id);

    if (!perfilId) {
      throw new PerfilNotExistError();
    }

    return {
      status: perfilId.account_status,
    };
  }
}
