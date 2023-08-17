import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";

export class GetStatusPerfilUseCase {
  constructor(private perfilInfoRepository: IPerfilRepository) {}

  async execute(id: string): Promise<any> {
    const perfilId = await this.perfilInfoRepository.findById(id);

    if (!perfilId) {
      throw new PerfilNotExistError();
    }

    return {
      status: perfilId.account_status,
    };
  }
}
