import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilNotExistError } from "../@errors/Perfil/PerfilInfoNotExistError";
import { Perfil } from "@prisma/client";

export class UpdateByUserPerfilUseCase {
  constructor(private perfilRepository: IPerfilRepository) {}

  async execute(owner_id: string, date: any): Promise<Perfil> {
    const findId = await this.perfilRepository.findByUser(owner_id);

    if (!findId) {
      throw new PerfilNotExistError();
    }

    const updatePerfil = await this.perfilRepository.updateByUser(owner_id, {
      ...date,
    });

    return updatePerfil;
  }
}
