import { IConfigurationRepository } from "@/repositories/interface/IConfigurationRepository";
import { Configuration } from "@prisma/client";
import { ConfigurationNotExistError } from "../@errors/Configuration/ConfigurationNotExistError";

export class DeleteConfigurationUseCase {
  constructor(private configuration: IConfigurationRepository) {}

  async execute(id: string): Promise<Configuration> {
    const findId = await this.configuration.findById(id);

    if (!findId) {
      throw new ConfigurationNotExistError();
    }

    const getUser = await this.configuration.delete(id);
    return getUser;
  }
}
