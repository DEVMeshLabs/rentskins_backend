import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { Configuration } from "@prisma/client";
import { ConfigurationNotExistError } from "../@errors/Configuration/ConfigurationNotExistError";

export class GetUserIdConfigurationUseCase {
  constructor(private configuration: IConfigurationRepository) {}

  async execute(owner_id: string): Promise<Configuration> {
    const getUser = await this.configuration.findByUser(owner_id);

    if (!getUser) {
      throw new ConfigurationNotExistError();
    }

    return getUser;
  }
}
