import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { Configuration } from "@prisma/client";
import { ConfigurationAlreadyExistError } from "../@errors/Configuration/ConfigurationAlreadyExistError";
import { IConfigurationRepositoryRequest } from "@/@types/ICreateConfigurationRequest";

export class CreateConfigurationUseCase {
  constructor(private configurationRepository: IConfigurationRepository) {}

  async execute({
    owner_id,
    owner_email,
    owner_name,
    url_sell,
    url_trade,
    steam_guard,
    agreed_with_emails,
    agreed_with_terms,
  }: IConfigurationRepositoryRequest): Promise<Configuration> {
    const findUser = await this.configurationRepository.findByUser(owner_id);

    if (findUser) {
      throw new ConfigurationAlreadyExistError();
    }

    const createConfig = await this.configurationRepository.create({
      owner_id,
      owner_email,
      owner_name,
      url_sell,
      url_trade,
      steam_guard,
      agreed_with_emails,
      agreed_with_terms,
    });
    return createConfig;
  }
}
