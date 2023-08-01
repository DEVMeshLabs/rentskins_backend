import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { Perfil } from "@prisma/client";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";

export class DeletePerfilUseCase {
  constructor(private perfilInfoRepository: IPerfilRepository) {}

  async execute(id: string): Promise<Perfil> {
    const perfilId = await this.perfilInfoRepository.findById(id);
    if (!perfilId) {
      throw new PerfilNotExistError();
    }

    const deletePerfil = await this.perfilInfoRepository.deletePerfil(id);

    return deletePerfil;
  }
}
