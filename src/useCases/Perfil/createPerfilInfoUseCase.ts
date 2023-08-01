import { IPerfilInfoRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { PerfilInfo, Prisma } from "@prisma/client";
import { PerfilInfoAlreadyExistError } from "../@errors/Perfil/PerfilInfoAlreadyExistError";

export class CreatePerfilInfoUseCase {
  constructor(private perfilInfoRepository: IPerfilInfoRepository) {}

  async execute(data: Prisma.PerfilInfoCreateInput): Promise<PerfilInfo> {
    const getUser = await this.perfilInfoRepository.findByUser(data.owner_id);

    if (getUser) {
      throw new PerfilInfoAlreadyExistError();
    }

    const create = await this.perfilInfoRepository.create({ ...data });
    return create;
  }
}
