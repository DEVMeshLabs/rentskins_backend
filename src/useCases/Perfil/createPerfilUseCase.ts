import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { Perfil, Prisma } from "@prisma/client";
import { PerfilAlreadyExistError } from "../@errors/Perfil/PerfilInfoAlreadyExistError";

export class CreatePerfilUseCase {
  constructor(private perfilRepository: IPerfilRepository) {}

  async execute({
    owner_id,
    steam_level,
    account_date,
    picture,
    owner_name,
  }: Prisma.PerfilCreateInput): Promise<Perfil> {
    const getUser = await this.perfilRepository.findByUser(owner_id);

    if (getUser) {
      throw new PerfilAlreadyExistError();
    }

    const create = await this.perfilRepository.create({
      owner_id,
      owner_name,
      picture,
      steam_level,
      account_date,
    });
    return create;
  }
}
