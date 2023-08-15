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

    await Promise.all([
      await this.configurationRespository.create({ ...date }),
      await this.perfilRepository.findByUser(data1.owner_id),
    ]);

    const create = await this.perfilRepository.create({
      ...data1,
      configurationId: data1.owner_id,
    });

    return create;
  }
}
