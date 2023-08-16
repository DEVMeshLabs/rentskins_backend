import { IPerfilRepository } from "@/repositories/interfaceRepository/IPerfilRepository";
import { Perfil, Prisma } from "@prisma/client";
import { PerfilAlreadyExistError } from "../@errors/Perfil/PerfilInfoAlreadyExistError";
import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";

export class CreatePerfilUseCase {
  constructor(
    private perfilRepository: IPerfilRepository,
    private configurationRespository: IConfigurationRepository
  ) {}

  async execute(
    date: Prisma.ConfigurationCreateInput,
    data1: Prisma.PerfilUncheckedCreateInput
  ): Promise<Perfil> {
    const findIdUser = await this.perfilRepository.findByUser(data1.owner_id);

    if (findIdUser) {
      throw new PerfilAlreadyExistError();
    }

    const result = await this.configurationRespository.create({ ...date });

    const create = await this.perfilRepository.create({
      ...data1,
      configurationId: result.id,
    });

    return create;
  }
}
