import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import { Perfil } from "@prisma/client";

export class UpdateByUserPerfilUseCase {
  constructor(private perfilRepository: IPerfilRepository) {}

  async execute(owner_id: string, date: any): Promise<Perfil> {
    const foundUserProfile = await this.perfilRepository.findByUser(owner_id);

    if (!foundUserProfile) {
      throw new PerfilNotExistError();
    }

    const updatedPerfil = await this.perfilRepository.updateByUser(owner_id, {
      ...date,
    });

    return updatedPerfil;
  }
}
