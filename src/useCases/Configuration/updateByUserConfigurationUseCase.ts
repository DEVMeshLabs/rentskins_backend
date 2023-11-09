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
    const existingConfig = await this.configuration.findByUser(owner_id);

    if (!existingConfig) {
      throw new ConfigurationNotExistError();
    }

    const allConfigurations = await this.configuration.findByMany();

    const isDuplicate = allConfigurations.filter((config) => {
      if (config.owner_id === data.owner_id && config.owner_id !== owner_id) {
        throw new ConfigurationAlreadyExistCpfError("Perfil já existe.");
      } else if (
        config.owner_cpf === data.owner_cpf &&
        config.owner_id !== owner_id
      ) {
        throw new ConfigurationAlreadyExistCpfError(
          "CPF já cadastrado no sistema."
        );
      } else if (
        config.owner_email === data.owner_email &&
        config.owner_id !== owner_id
      ) {
        throw new ConfigurationAlreadyExistCpfError(
          "Email já cadastrado no sistema."
        );
      } else if (
        config.owner_phone === data.owner_phone &&
        config.owner_id !== owner_id
      ) {
        throw new ConfigurationAlreadyExistCpfError(
          "Telefone já cadastrado no sistema."
        );
      } else if (
        config.url_trade === data.url_trade &&
        config.owner_id !== owner_id
      ) {
        throw new ConfigurationAlreadyExistCpfError(
          "Trade Link já cadastrado no sistema."
        );
      }

      return true;
    });

    if (!isDuplicate) {
      return;
    }

    const updateId = await this.configuration.updateById(owner_id, { ...data });

    return updateId;
  }
}
