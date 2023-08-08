import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { Perfil, Prisma } from "@prisma/client";
import { PerfilAlreadyExistError } from "../@errors/Perfil/PerfilInfoAlreadyExistError";

export class CreatePerfilUseCase {
  constructor(private perfilRepository: IPerfilRepository) {}

  async execute(data: Prisma.PerfilCreateInput): Promise<Perfil> {
    const getUser = await this.perfilRepository.findByUser(data.owner_id);

    if (getUser) {
      throw new PerfilAlreadyExistError();
    }

    const create = await this.perfilRepository.create({ ...data });
    return create;
  }
}
