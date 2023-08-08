import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { Configuration, Prisma } from "@prisma/client";
import { ConfigurationAlreadyExistError } from "../@errors/Configuration/ConfigurationAlreadyExistError";

export class CreateConfigurationUseCase {
  constructor(private configurationRepository: IConfigurationRepository) {}

  async execute(data: Prisma.ConfigurationCreateInput): Promise<Configuration> {
    const findUser = await this.configurationRepository.findByUser(
      data.owner_id
    );

    if (findUser) {
      throw new ConfigurationAlreadyExistError();
    }

    const createConfig = await this.configurationRepository.create({
      ...data,
    });
    return createConfig;
  }
}
