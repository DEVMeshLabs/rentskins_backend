import { IConfigurationRepository } from "@/repositories/interface/IConfigurationRepository";
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
    {
      owner_id,
      owner_name,
      owner_email,
      agreed_with_emails,
      agreed_with_terms,
      steam_guard,
      url_sell,
      url_trade,
    }: IConfigurationUseCaseRequest
  ): Promise<Configuration> {
    const findConfig = await this.configuration.findById(id);

    if (!findConfig) {
      throw new ConfigurationNotExistError();
    }

    const updateId = await this.configuration.updateById(id, {
      owner_id,
      owner_name,
      owner_email,
      agreed_with_emails,
      agreed_with_terms,
      steam_guard,
      url_sell,
      url_trade,
    });

    return updateId;
  }
}
