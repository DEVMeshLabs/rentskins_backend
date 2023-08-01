import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { Configuration } from "@prisma/client";
import { ConfigurationNotExistError } from "../@errors/Configuration/ConfigurationNotExistError";

interface IConfigurationUseCaseRequest {
  owner_name?: string;
  owner_id?: string;
  owner_email?: string;
  url_trade?: string;
  url_sell?: string;
  agreed_with_emails?: boolean;
  agreed_with_terms?: boolean;
  steam_guard?: boolean;
}

export class UpdateByIdUseCase {
  constructor(private configuration: IConfigurationRepository) {}

  async execute(
    id: string,
    data: IConfigurationUseCaseRequest
  ): Promise<Configuration> {
    const findConfig = await this.configuration.findById(id);

    if (!findConfig) {
      throw new ConfigurationNotExistError();
    }

    const updateId = await this.configuration.updateById(id, { ...data });

    return updateId;
  }
}
