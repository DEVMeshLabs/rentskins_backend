import { Perfil } from "@prisma/client";
import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";

export class UpdatePerfilUseCase {
  constructor(private perfilRepository: IPerfilRepository) {}

  async execute(id: string, date: any): Promise<Perfil> {
    const foundProfile = await this.perfilRepository.findById(id);

    if (!foundProfile) {
      throw new PerfilNotExistError();
    }

    const updatedPerfil = await this.perfilRepository.updateById(id, {
      ...date,
    });

    return updatedPerfil;
  }
}
