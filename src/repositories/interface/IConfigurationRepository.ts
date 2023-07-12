import { Configuration, Prisma } from "@prisma/client";

export interface IConfigurationRepository {
  findByMany(): Promise<Configuration[]>;
  create(data: Prisma.ConfigurationCreateInput): Promise<Configuration>;
}
