import { Configuration, Prisma } from "@prisma/client";

export interface IConfigurationRepository {
  findByUser(owner_id: string): Promise<Configuration>;
  findById(id: string): Promise<Configuration>;
  findByMany(): Promise<Configuration[]>;
  create(data: Prisma.ConfigurationCreateInput): Promise<Configuration>;
  updateById(
    owner_id: string,
    data: Prisma.ConfigurationUncheckedUpdateManyInput
  ): Promise<Prisma.BatchPayload>;
  delete(id: string): Promise<Configuration>;
}
