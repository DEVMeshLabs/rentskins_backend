import { IConfigurationRepository } from "@/repositories/interface/IConfigurationRepository";
import { Configuration } from "@prisma/client";
import { ConfigurationNotExistError } from "../errors/Configuration/ConfigurationNotExistError";

export class GetConfigurationUseCase {
  constructor(private configuration: IConfigurationRepository) {}

  async execute(id: string): Promise<Configuration> {
    const getMany = await this.configuration.findById(id);

    if (!getMany) {
      throw new ConfigurationNotExistError();
    }

    return getMany;
  }
}
