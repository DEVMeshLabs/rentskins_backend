import { Configuration, Prisma } from "@prisma/client";
import { IConfigurationRepository } from "../interfaceRepository/IConfigurationRepository";
import { randomUUID } from "node:crypto";
import { IUpdateConfigurationUseCaseRequest } from "@/@types/IUpdateConfigurationRequest";

export class InMemoryConfiguration implements IConfigurationRepository {
  public config: Configuration[] = [];

  async updateById(id: string, data: IUpdateConfigurationUseCaseRequest) {
    const findConfig = this.config.findIndex((item) => item.id === id);
    const nova = { ...this.config[findConfig], ...data };

    if (findConfig !== -1) {
      this.config[findConfig] = nova;
      this.config[findConfig].updatedAt = new Date();
      return this.config[findConfig];
    }
    return null;
  }

  async create(data: Prisma.ConfigurationCreateInput) {
    const createConfig = {
      id: randomUUID(),
      owner_name: data.owner_name,
      owner_id: data.owner_id,
      owner_email: data.owner_email,
      url_trade: data.url_trade,
      url_sell: data.url_sell,
      agreed_with_emails: data.agreed_with_emails,
      agreed_with_terms: data.agreed_with_terms,
      steam_guard: data.steam_guard,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    this.config.push(createConfig);
    return createConfig;
  }

  async findByUser(owner_id: string) {
    const configUser = this.config.find((conf) => conf.owner_id === owner_id);
    return configUser;
  }

  async findById(id: string) {
    const configUser = this.config.find(
      (conf) => conf.id === id && conf.deletedAt === null
    );
    return configUser;
  }

  async findByMany() {
    const configAll = this.config.map((item) => item);
    return configAll;
  }

  async delete(id: string): Promise<any> {
    const getIndex = this.config.find((item) => {
      if (item.id === id) {
        item.deletedAt = new Date();
        return true;
      }
      return false;
    });

    return getIndex;
  }
}
