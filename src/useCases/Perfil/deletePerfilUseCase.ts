import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { Perfil } from "@prisma/client";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";

export class DeletePerfilUseCase {
  constructor(private perfilInfoRepository: IPerfilRepository) {}

  async execute(id: string, force: string): Promise<Perfil> {
    const perfilId = await this.perfilInfoRepository.findById(id);

    if (!perfilId) {
      throw new PerfilNotExistError();
    }

    if (force === "true") {
      const response = await this.perfilInfoRepository.deletePerfilBanco(id);
      return response;
    }

    const deletePerfil = await this.perfilInfoRepository.deletePerfil(
      id,
      force
    );

    return deletePerfil;
  }
}
