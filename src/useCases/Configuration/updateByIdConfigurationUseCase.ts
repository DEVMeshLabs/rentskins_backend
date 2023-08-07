import { IConfigurationRepository } from "@/repositories/interfaceRepository/IConfigurationRepository";
import { Prisma } from "@prisma/client";
import { ConfigurationNotExistError } from "../@errors/Configuration/ConfigurationNotExistError";

// interface IConfigurationUseCaseRequest {
//   owner_name?: string;
//   owner_id?: string;
//   owner_email?: string;
//   url_trade?: string;
//   url_sell?: string;
//   agreed_with_emails?: boolean;
//   agreed_with_terms?: boolean;
//   steam_guard?: boolean;
//   phone?: string;
// }

export class UpdateByIdUseCase {
  constructor(private configuration: IConfigurationRepository) {}

  async execute(
    owner_id: string,
    data: Prisma.ConfigurationUpdateInput
  ): Promise<Prisma.BatchPayload> {
    const findConfig = await this.configuration.findByUser(owner_id);

    if (!findConfig) {
      throw new ConfigurationNotExistError();
    }

    const updateId = await this.configuration.updateById(owner_id, { ...data });

    return updateId;
  }
}
