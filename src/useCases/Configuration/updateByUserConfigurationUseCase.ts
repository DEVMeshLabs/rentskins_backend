import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { Prisma } from "@prisma/client";
import { ConfigurationNotExistError } from "../@errors/Configuration/ConfigurationNotExistError";
import { ConfigurationAlreadyExistCpfError } from "../@errors/Configuration/ConfigurationAlreadyExistCpfError";

export class UpdateByIdUseCase {
  constructor(private configuration: IConfigurationRepository) {}

  async execute(
    owner_id: string,
    data: Prisma.ConfigurationUpdateInput
  ): Promise<Prisma.BatchPayload> {
    const findConfig = await this.configuration.findByUser(owner_id);

    const findAllConfig = await this.configuration.findByMany();
    const isAlreadyExistCpf = findAllConfig.find((config) => {
      return config.owner_cpf === data.owner_cpf;
    });

    if (isAlreadyExistCpf) {
      throw new ConfigurationAlreadyExistCpfError();
    }

    if (!findConfig) {
      throw new ConfigurationNotExistError();
    }

    const updateId = await this.configuration.updateById(owner_id, { ...data });

    return updateId;
  }
}
