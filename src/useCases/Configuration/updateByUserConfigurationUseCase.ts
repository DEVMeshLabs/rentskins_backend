import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { Configuration, Prisma } from "@prisma/client";
import { ConfigurationNotExistError } from "../@errors/Configuration/ConfigurationNotExistError";
import { checkDuplicate } from "@/useCases/Wallet/utils/checkDuplicateConfiguration";

export class UpdateByUserConfigurationUseCase {
  constructor(private configuration: IConfigurationRepository) {}

  async execute(
    owner_id: string,
    data: Prisma.ConfigurationUpdateInput
  ): Promise<Configuration> {
    const existingConfig = await this.configuration.findByUser(owner_id);

    if (!existingConfig) {
      throw new ConfigurationNotExistError();
    }

    const allConfigurations = await this.configuration.findByMany();
    const isDuplicate = allConfigurations.some((config) => {
      checkDuplicate(
        config,
        "owner_id",
        data.owner_id as string,
        "Perfil já existe.",
        owner_id
      );
      checkDuplicate(
        config,
        "owner_cpf",
        data.owner_cpf as string,
        "CPF já cadastrado no sistema.",
        owner_id
      );
      checkDuplicate(
        config,
        "owner_email",
        data.owner_email as string,
        "Email já cadastrado no sistema.",
        owner_id
      );
      checkDuplicate(
        config,
        "owner_phone",
        data.owner_phone as string,
        "Telefone já cadastrado no sistema.",
        owner_id
      );
      checkDuplicate(
        config,
        "url_trade",
        data.url_trade as string,
        "Trade Link já cadastrado no sistema.",
        owner_id
      );

      return true;
    });

    if (!isDuplicate) {
      return;
    }

    const updateId = await this.configuration.updateByUser(owner_id, {
      ...data,
    });

    return updateId;
  }
}
