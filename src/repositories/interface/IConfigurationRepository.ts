import { Configuration, Prisma } from "@prisma/client";

export interface IConfigurationRepository {
  findById(id: string): Promise<Configuration>;
  findByMany(): Promise<Configuration[]>;
  create(data: Prisma.ConfigurationCreateInput): Promise<Configuration>;
}
