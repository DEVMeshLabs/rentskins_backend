import { Configuration, Prisma } from "@prisma/client";
import { IConfigurationRepository } from "../interfaceRepository/IConfigurationRepository";

export class InMemoryConfiguration implements IConfigurationRepository {
  create(data: Prisma.ConfigurationCreateInput): Promise<any> {
    throw new Error("Method not implemented.");
  }

  updateById(
    owner_id: string,
    data: Prisma.ConfigurationUncheckedUpdateManyInput
  ): Promise<Prisma.BatchPayload> {
    throw new Error("Method not implemented.");
  }

  public config: Configuration[] = [];

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
