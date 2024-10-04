import { Configuration, Prisma } from "@prisma/client";
import { IConfigurationRepository } from "../interfaceRepository/IConfigurationRepository";
import { randomUUID } from "crypto";

export class InMemoryConfigurationRepository
  implements IConfigurationRepository
{
  public config = [];

  private notImplemented(): Promise<any> {
    return Promise.resolve(null);
  }

  async create(data: Prisma.ConfigurationCreateInput): Promise<Configuration> {
    const config = {
      id: data.owner_id ?? randomUUID(),
      owner_id: data.owner_id,
      owner_name: data.owner_name,
      owner_email: "",
      owner_phone: "",
      owner_cpf: "",
      url_sell: "",
      url_trade: "",
      agreed_with_emails: false,
      agreed_with_terms: false,
      key: data.key,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    this.config.push(config);

    return config;
  }

  async updateByUser(
    owner_id: string,
    data: Prisma.ConfigurationUncheckedUpdateManyInput
  ): Promise<Configuration> {
    const index = this.config.findIndex((item) => item.owner_id === owner_id);

    if (index !== -1) {
      this.config[index] = { ...this.config[index], ...data };
      return this.config[index];
    }
    return this.config[index];
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
