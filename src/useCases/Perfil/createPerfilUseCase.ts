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
    date1: Prisma.ConfigurationCreateInput,
    data: Prisma.PerfilUncheckedCreateInput
  ): Promise<Perfil> {
    const response = await Promise.all([
      await this.configurationRespository.create({ ...date1 }),
      await this.perfilRepository.findByUser(data.owner_id),
    ]);

    if (response[1]) {
      throw new PerfilAlreadyExistError();
    }

    const create = await this.perfilRepository.create({
      ...data,
      configurationId: data.owner_id,
    });
    return create;
  }
}
