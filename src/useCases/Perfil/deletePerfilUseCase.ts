import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { Perfil } from "@prisma/client";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";

export class DeletePerfilUseCase {
  constructor(private perfilInfoRepository: IPerfilRepository) {}

  async execute(id: string, isForceDeletion: string): Promise<Perfil> {
    const foundPerfil = await this.perfilInfoRepository.findById(id);

    if (!foundPerfil) {
      throw new PerfilNotExistError();
    }

    if (isForceDeletion === "true") {
      const response = await this.perfilInfoRepository.deletePerfilBanco(id);
      return response;
    }

    const perfilToDelete = await this.perfilInfoRepository.deletePerfil(id);
    return perfilToDelete;
  }
}
